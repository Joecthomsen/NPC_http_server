var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
//const controleGearService = require('../service/controleGearService');
const ControleGear = require("../schemas/controleGearSchema");
const Controller = require("../schemas/controllerSchema");
const DataInstance = require("../schemas/dataInstance");
const User = require("../schemas/userSchema");

const verify_middleware = require("../service/verify_token");

router.post(
  "/add_control_gear",
  verify_middleware.verifyControllerToken,
  async (req, res, next) => {
    try {
      // Extracting required property
      const { manufactoringID } = req.body;
      const { popID } = req.headers;

      console.log(manufactoringID);
      console.log(popID);

      if (!manufactoringID) {
        return res
          .status(400)
          .json({ error: "Manufacturing ID, Email and popID are required" });
      }

      console.log(manufactoringID);

      const controller = await Controller.findOne({ popID });
      if (!controller) {
        return res
          .status(404)
          .json({ error: 'Controller with popID "' + popID + '" not found' });
      }

      const new_control_gear = await ControleGear.create({
        manufactoringID,
      });
      if (!new_control_gear) {
        return res.status(400).json({ error: "ControleGear not created" });
      }

      controller.controleGears.push(manufactoringID);
      await controller.save();
      if (!controller) {
        return res.status(400).json({ error: "Controller not updated" });
      }

      res.status(200).json({ manufactoringID });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/new_data_instance",
  verify_middleware.verifyControllerToken,
  async (req, res, next) => {
    try {
      // Extracting required property
      const { manufactoringID } = req.body;

      const { popID } = req.headers;

      if (!manufactoringID || !popID) {
        return res
          .status(400)
          .json({ error: "Manufacturing ID and popID is required" });
      }

      console.log("req.body: ", req.body);

      const controller = await Controller.findOne({ popID });
      if (!controller) {
        return res
          .status(404)
          .json({ error: 'Controller with popID "' + popID + '" not found' });
      }

      console.log("Controller: ", controller);

      if (controller.controleGears.includes(manufactoringID)) {
        const controleGear = await ControleGear.findOne({ manufactoringID });
        if (!controleGear) {
          return res.status(404).json({ error: "ControleGear not found" });
        }

        const new_data_instance = new DataInstance({});

        // Assigning other properties from req.body if they exist
        Object.assign(new_data_instance, req.body);
        console.log("New data instance: ", new_data_instance);

        // Save the new ControleGear instance to the database
        const savedControleGear = await new_data_instance.save();
        if (!savedControleGear) {
          return res.status(400).json({ error: "DataInstance not created" });
        }

        controleGear.dataInstances.push(new_data_instance);
        controleGear.save();
        if (!controleGear) {
          return res.status(400).json({ error: "ControleGear not updated" });
        }

        res.status(201).json(savedControleGear); // Respond with the saved ControleGear object
      } else {
        return res.status(403).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Error saving ControleGear:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving ControleGear" });
    }
  }
);

router.get("/all", async (req, res, next) => {
  try {
    const controleGear = await ControleGear.find();
    res.status(200).json(controleGear);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get(
  "/:manufactoringID",
  verify_middleware.verifyUserToken,
  async (req, res, next) => {
    console.log(req.params.manufactoringID);
    try {
      const { manufactoringID } = req.params;
      const controleGear = await ControleGear.find({ manufactoringID });
      res.status(200).json(controleGear);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.get(
  "/controle_gears/:popID",
  verify_middleware.verifyControllerToken,
  async (req, res, next) => {
    try {
      const { popID } = req.params;
      let controleGearsToReturn = [];
      const controller = await Controller.findOne({ popID });

      if (!controller) {
        return res
          .status(404)
          .json({ error: "Controller with popID " + popID + " not found" });
      }

      console.log(controller.controleGears);

      res.status(200).json({ controleGears: controller.controleGears });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
);

router.get(
  "/diagnostics/:manufactoringID",
  verify_middleware.verifyUserToken,
  async (req, res, next) => {
    try {
      const { manufactoringID } = req.params;
      const controleGear = await ControleGear.findOne({ manufactoringID });
      const latestDataInstance = await DataInstance.findById(
        controleGear.dataInstances[controleGear.dataInstances.length - 1]
      );
      console.log(latestDataInstance);

      return res.status(200).json(latestDataInstance);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
