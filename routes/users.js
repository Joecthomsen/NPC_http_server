var express = require("express");
var router = express.Router();
const Controller = require("../schemas/controllerSchema");
const verify_middleware = require("../service/verify_token");

const User = require("../schemas/userSchema");
const { verifyUserToken } = require("../service/verify_token");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send('respond with a resource');
  res.status(200).json({ "This is a test": "This is a test" });
});

router.get("/:email", async (req, res, next) => {
  const { email } = req.params;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

router.post("/create", async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log(email, password, name);

  const user = await User.create({ email, password, name });
  if (!user) {
    return res.status(400).json({ error: "User not created" });
  }
  res.status(200).json({ email: email, name: name });
});

router.get(
  "/controllers/all",
  verify_middleware.verifyUserToken,
  async (req, res, next) => {
    console.log("TEST");
    const { email } = req.headers;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await User.findOne({ email });
    // Map the array of controller IDs to an array of promises
    const controllerPromises = user.controllers.map(async (controllerID) => {
      // Directly destructure the properties from the result of Controller.findOne() and return them
      const { popID, name, controleGears } = await Controller.findOne({
        popID: controllerID,
      });
      return { popID, name, controleGears };
    });

    // Wait for all promises to resolve using Promise.all()
    const controllers = await Promise.all(controllerPromises);
    return res.status(200).json({ controllers });
  }
);

module.exports = router;
