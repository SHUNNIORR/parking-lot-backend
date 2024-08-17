const calculateParkingFee = require("../helpers/tickets/tickets-utils");
const Ticket = require("../models/ticket");

const createTicket = async (req, res) => {
  const { plate, typeOfVehicle } = req.body;

  const plateTicketAlreadyExists = await Ticket.findOne({ plate });

  if (plateTicketAlreadyExists && plateTicketAlreadyExists.active) {
    return res
      .status(400)
      .json({ message: "Ticket with this plate already exists" });
  }

  const ticket = new Ticket({ plate, typeOfVehicle });

  await ticket.save();
  res.json({ msg: "Ticket created", ticket });
};

const closeTicket = async (req, res) => {
  const { plate } = req.body;

  const plateTicketAlreadyExists = await Ticket.findOne({
    plate,
    active: true,
  });

  if (!plateTicketAlreadyExists && !plateTicketAlreadyExists.active) {
    return res
      .status(400)
      .json({
        message: "Ticket with this plate doesnt exists or its not active",
      });
  }
  plateTicketAlreadyExists.departureTime = new Date();
  plateTicketAlreadyExists.active = false;
  plateTicketAlreadyExists.fee = calculateParkingFee(
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

module.exports = { createTicket, closeTicket };
