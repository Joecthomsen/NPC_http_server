var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const controleGearService = require('../service/controleGearService');
const ControleGear = require('../schemas/controleGearSchema');

var jsonParser = bodyParser.json();
var urlParser = bodyParser.urlencoded({ extended: false });

router.post('/new_data', async (req, res, next) => {
    try {
        // Extracting required property
        const { manufacturingID, ownerID } = req.body;

        // Creating a new ControleGear instance with the required property
        const newControleGear = new ControleGear({ manufacturingID });

        // Assigning other properties from req.body if they exist
        Object.assign(newControleGear, req.body);
        console.log(newControleGear);   

        // Save the new ControleGear instance to the database
        const savedControleGear = await newControleGear.save();

        if(ownerID) {
            // If ownerID exists, add the ControleGear to the owner's ControleGear array
            savedControleGear.ownerID = ownerID;
        } 

        res.status(201).json(savedControleGear); // Respond with the saved ControleGear object
    } catch (error) {
        console.error('Error saving ControleGear:', error);
        res.status(500).json({ error: 'An error occurred while saving ControleGear' });
    }
});

router.get('/all', async (req, res, next) => {
    try {
        const controleGear = await ControleGear.find();
        res.status(200).json(controleGear);
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
});

router.get('/:manufactoringID', async (req, res, next) => {
    try {
        const {manufactoringID} = req.params;
        const controleGear = await ControleGear.find({manufactoringID});
        res.status(200).json(controleGear);
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
})

module.exports = router;