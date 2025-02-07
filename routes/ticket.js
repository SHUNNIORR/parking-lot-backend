const { Router } = require("express");
const { check } = require("express-validator");
const validateJwt = require("../helpers/validate-jwt");
const { isAdmin } = require("../helpers/validate-roles");
const validateFields = require("../middlewares/validate-fields");
const { createTicket,closeTicket, getActiveTickets, getClosedTickets } = require("../controllers/tickets");
const router = Router();

router.get("/actives",[validateJwt], getActiveTickets);
router.get("/closed",[validateJwt], getClosedTickets);
router.post(
  "/create",
  [
    validateJwt,
    isAdmin,
    check("plate", "Plate is empty").not().isEmpty(),
    check("typeOfVehicle", "Please specify the type of vehicle")
      .not()
      .isEmpty(),
    check("typeOfVehicle", "The type of vehicle dont exist").isIn([
      "CAR",
      "MOTORCYCLE",
    ]),
    validateFields,
  ],
  createTicket
);

router.put(
  "/close",
  [
    validateJwt,
    isAdmin,
    check("plate", "Plate is empty").not().isEmpty(),
    validateFields,
  ],
  closeTicket
);

module.exports = router;
