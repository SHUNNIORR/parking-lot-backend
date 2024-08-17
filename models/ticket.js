const {Schema, model} = require('mongoose')

const TicketSchema = Schema({
    plate:{
        type: String,
        required: [true,'Placa de auto requerida.']
    },
    typeOfVehicle: {
        type: String,
        required: [true,'Tipo de vehiculo requerido.'],
        emun:['CAR', 'MOTORCYCLE'],
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