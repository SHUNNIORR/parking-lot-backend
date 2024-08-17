const Ticket = require("../../models/ticket");

const plateExists = async (plate = "") => {
  const exists = await Ticket.findOne({ plate });
  if (exists) {
    throw new Error(`plate ${plate} does already exist in the database`);
  }
};

module.exports = { plateExists };
