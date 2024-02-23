const mongoose = require('mongoose')
const { Schema } = mongoose

const controleGearSchema = new Schema(
    {
        ownerID: Schema.Types.ObjectId,
        manufactoringID: {
            type: String,
            required: true
        },

        // Memory bank 205
        operatingTime: Number,
        startCounter: String,
        externalSupplyVoltage: Number,
        externalSupplyVoltageFrequency: Number,
        powerFactor: Number,
        overallFailureCondition: Number,
        externalSupplyUndervoltage: Number,
        externalSupplyUndervoltageCounter: Number,
        externalSupplyOvervoltage: Number,
        externalSupplyOvervoltageCounter: Number,
        outputPowerLimitation: Number,
        outputPowerLimitationCounter: Number,
        thermalDerating: Number,
        thermalDeratingCounter: Number,
        thermalShutdown: Number,
        thermalShutdownCounter: Number,
        temperature: Number,
        outputCurrentPercent: Number,
        // Memory bank 206
        lightSourceStartCounterResettable: String,
        lightSourceStartCounter: String,
        lightSourceOnTimeResettable: Number,
        lightSourceOnTime: Number,
        lightSourceVoltage: Number,
        lightSourceCurrent: Number,
        lightSourceOverallFailureCondition: Number,
        lightSourceOverallFailureConditionCounter: Number,
        lightSourceShortCircuit: Number,
        lightSourceShortCircuitCounter: Number,
        lightSourceOpenCircuit: Number,
        lightSourceOpenCircuitCounter: Number,
        lightSourceThermalDerating: Number,
        lightSourceThermalDeratingCounter: Number,
        lightSourceThermalShutdown: Number,
        lightSourceThermalShutdownCounter: Number,
        lightSourceTemperature: Number,
        // Memory bank 207
        ratedMedianUsefulLifeOfLuminare: Number,
        internalControleGearReferenceTemperature: Number,
        ratedMedianUsefulLightSourceStarts: Number
    },
    {
        timestamps: true
    }
)

const ControleGear = mongoose.model('ControleGear', controleGearSchema)
module.exports = ControleGear
