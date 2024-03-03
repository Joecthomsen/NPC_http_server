const mongoose = require("mongoose");
const { Schema } = mongoose;

const dataInstanceSchema = new Schema(
  {
    // Memory bank 205
    operating_time: Number,
    start_counter: Number,
    external_supply_voltage: Number,
    external_supply_voltage_frequency: Number,
    power_factor: Number,
    overall_faliure_condition: Number,
    external_supply_undervoltage: Number,
    external_supply_undervoltage_counter: Number,
    external_supply_overvoltage: Number,
    external_supply_overvoltage_counter: Number,
    output_power_limitation: Number,
    output_power_limitation_counter: Number,
    thermal_derating: Number,
    thermal_derating_counter: Number,
    thermal_shutdown: Number,
    thermal_shutdown_counter: Number,
    temperature: Number,
    output_current_percent: Number,
    // Memory bank 206
    light_source_start_counter_resettable: Number,
    light_source_start_counter: Number,
    light_source_on_time_resettable: Number,
    light_source_on_time: Number,
    light_source_voltage: Number,
    light_source_current: Number,
    light_source_overall_faliure_condition: Number,
    light_source_overall_faliure_condition_counter: Number,
    light_source_short_circuit: Number,
    light_source_short_circuit_counter: Number,
    light_source_open_circuit: Number,
    light_source_open_circuit_counter: Number,
    light_source_thermal_derating: Number,
    light_source_thermal_derating_counter: Number,
    light_source_thermal_shutdown: Number,
    light_source_thermal_shutdown_counter: Number,
    light_source_temperature: Number,
    // Memory bank 207
    rated_median_usefull_life_of_luminare: Number,
    internal_controle_gear_reference_temperature: Number,
    rated_median_usefull_light_source_starts: Number,
  },
  {
    timestamps: true,
  }
);

const DataInstance = mongoose.model("dataInstanceSchema", dataInstanceSchema);
module.exports = DataInstance;
