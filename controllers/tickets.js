const { response, request } = require("express");
const {
  calculateParkingFee,
  mappedTickets,
} = require("../helpers/tickets/utils/tickets-utils");
const Ticket = require("../models/ticket");
const VehicleType = require("../models/vehicle-type");

const createTicket = async (req, res) => {
  try {
    const { plate, typeOfVehicle } = req.body;

    // Buscar el tipo de vehículo en la colección VehicleType
    const vehicleType = await VehicleType.findOne({ type: typeOfVehicle });
    if (!vehicleType) {
      return res.status(400).json({ message: "Tipo de vehículo inválido." });
    }

    const plateTicketAlreadyExists = await Ticket.findOne({
      plate,
      active: true,
    });
    if (plateTicketAlreadyExists) {
      return res
        .status(400)
        .json({ message: "Ticket con esta placa ya existe y está activo" });
    }

    // Crear el ticket usando `typeOfVehicle` con la referencia al ID de VehicleType
    const ticket = new Ticket({
      plate,
      typeOfVehicle: vehicleType._id, // Usa el ID del tipo de vehículo
    });

    await ticket.save();
    res.json({ msg: "Ticket creado", ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el ticket." });
  }
};
const getActiveTickets = async (req = request, res = response) => {
  const query = { active: true };
  const [total, tickets] = await Promise.all([
    Ticket.countDocuments(query),
    Ticket.find(query).populate("typeOfVehicle", "type"),
  ]);
  res.json({ total, tickets: mappedTickets(tickets) });
};

const getClosedTickets = async (req = request, res = response) => {
  const query = { active: false };
  const [total, tickets] = await Promise.all([
    Ticket.countDocuments(query),
    Ticket.find(query).populate("typeOfVehicle", "type"),
  ]);
  res.json({ total, tickets: mappedTickets(tickets) });
};
const closeTicket = async (req, res) => {
  const { plate } = req.body;

  const plateTicketAlreadyExists = await Ticket.findOne({
    plate,
    active: true,
  });

  if (!plateTicketAlreadyExists && !plateTicketAlreadyExists.active) {
    return res.status(400).json({
      message: "Ticket with this plate doesnt exists or its not active",
    });
  }
  const vehicleType = await VehicleType.findById(plateTicketAlreadyExists.typeOfVehicle);
  plateTicketAlreadyExists.departureTime = new Date();
  plateTicketAlreadyExists.active = false;
  plateTicketAlreadyExists.fee = calculateParkingFee(
    vehicleType.type,
    plateTicketAlreadyExists.arrivalTime,
    new Date()
  );

  const ticket = await Ticket.findByIdAndUpdate(
    plateTicketAlreadyExists._id,
    plateTicketAlreadyExists,
    { new: true }
  );
  res.json({
    msg: `Ticket for vehicle ${plateTicketAlreadyExists.plate} has been closed`,
    ticket,
  });
};

module.exports = { createTicket, closeTicket, getActiveTickets, getClosedTickets };
