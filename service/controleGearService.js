const ControleGear = require('../schemas/controleGearSchema');

getAllControleGear = async (req, res, next) => {
    try {
        const controleGear = await ControleGear.find();
        res.status(200).json(controleGear);
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
}

getControleGearFromID = async (req, res, next) => {
    try {
        const {manufactoringID} = req.params;
        const controleGear = await ControleGear.find({manufactoringID});
        res.status(200).json(controleGear);
    } catch (error) {
        res.status(400).json({"error": error.message});
    }
}

async function addControleGearData(req, res, next) {
    try {
        console.log(req.body);
        const {
            manufactoringID,
            operatingTime,
            startCounter,
            externalSupplyVoltage,
            externalSupplyVoltageFrequency,
            powerFactor,
            overallFailureCondition,
            externalSupplyUndervoltage,
            externalSupplyUndervoltageCounter,
            externalSupplyOvervoltage,
            externalSupplyOvervoltageCounter,
            outputPowerLimitation,
            outputPowerLimitationCounter,
            thermalDerating,
            thermalDeratingCounter,
            thermalShutdown,
            thermalShutdownCounter,
            temperature,
            outputCurrentPercent,
            lightSourceStartCounterResettable,
            lightSourceStartCounter,
            lightSourceOnTimeResettable,
            lightSourceOnTime,
            lightSourceVoltage,
            lightSourceCurrent,
            lightSourceOverallFailureCondition,
            lightSourceOverallFailureConditionCounter,
            lightSourceShortCircuit,
            lightSourceShortCircuitCounter,
            lightSourceOpenCircuit,
            lightSourceOpenCircuitCounter,
            lightSourceThermalDerating,
            lightSourceThermalDeratingCounter,
            lightSourceThermalShutdown,
            lightSourceThermalShutdownCounter,
            lightSourceTemperature,
            ratedMedianUsefulLifeOfLuminare,
            internalControleGearReferenceTemperature,
            ratedMedianUsefulLightSourceStarts
        } = req.body;

        // Create a new instance of the ControleGear model with the request body
        const newControleGear = new ControleGear({
            manufactoringID,
            operatingTime,
            startCounter,
            externalSupplyVoltage,
            externalSupplyVoltageFrequency,
            powerFactor,
            overallFailureCondition,
            externalSupplyUndervoltage,
            externalSupplyUndervoltageCounter,
            externalSupplyOvervoltage,
            externalSupplyOvervoltageCounter,
            outputPowerLimitation,
            outputPowerLimitationCounter,
            thermalDerating,
            thermalDeratingCounter,
            thermalShutdown,
            thermalShutdownCounter,
            temperature,
            outputCurrentPercent,
            lightSourceStartCounterResettable,
            lightSourceStartCounter,
            lightSourceOnTimeResettable,
            lightSourceOnTime,
            lightSourceVoltage,
            lightSourceCurrent,
            lightSourceOverallFailureCondition,
            lightSourceOverallFailureConditionCounter,
            lightSourceShortCircuit,
            lightSourceShortCircuitCounter,
            lightSourceOpenCircuit,
            lightSourceOpenCircuitCounter,
            lightSourceThermalDerating,
            lightSourceThermalDeratingCounter,
            lightSourceThermalShutdown,
            lightSourceThermalShutdownCounter,
            lightSourceTemperature,
            ratedMedianUsefulLifeOfLuminare,
            internalControleGearReferenceTemperature,
            ratedMedianUsefulLightSourceStarts
        });

        // Save the new ControleGear instance to the database
        const savedControleGear = await newControleGear.save();

        res.status(201).json(savedControleGear); // Respond with the saved ControleGear object
    } catch (error) {
        console.error('Error saving ControleGear:', error);
        res.status(500).json({ error: 'An error occurred while saving ControleGear' });
    }
}

module.exports = {
    createControleGear: addControleGearData
};