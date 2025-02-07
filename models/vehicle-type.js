const { Schema, model } = require('mongoose');

const VehicleTypeSchema = Schema({
  type: {
    type: String,
    required: [true, 'El tipo de vehículo es requerido.'],
    unique: true 
  }
});

module.exports = model('VehicleType', VehicleTypeSchema);