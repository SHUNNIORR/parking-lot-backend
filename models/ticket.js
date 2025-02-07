const {Schema, model} = require('mongoose')

const TicketSchema = Schema({
    plate:{
        type: String,
        required: [true,'Placa de auto requerida.']
    },
    typeOfVehicle: {
        type: Schema.Types.ObjectId,
        ref: 'VehicleType', // Referencia al esquema VehicleType
        required: [true, 'Tipo de vehículo requerido.'],
    },
    arrivalTime:{
        type: Date,
        required: true,
        default: new Date()
    },
    departureTime:{
        type: Date,
        default: new Date()
    },
    active:{
        type: Boolean,
        default: true
    },
    fee:{
        type: Number,
        required: true,
        default: 0
    }
})
TicketSchema.methods.toJSON = function () {
  const { __v,_id,active, ...ticket } = this.toObject();
  ticket.uid = _id;
  return ticket;
};

module.exports = model('Ticket',TicketSchema)
