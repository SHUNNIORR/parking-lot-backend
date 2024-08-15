const { Router } = require("express");
const {
  usersGet,
  usersPost,
  usersPut,
  usersDelete,
} = require("../controllers/users");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validate-fields");
const {
  isValidRole,
  emailExists,
  existUserById,
} = require("../helpers/db-validators");
const login = require("../controllers/auth");
const validateJwt = require("../helpers/validate-jwt");

const router = Router();
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "password is not valid").isLength({ min: 6 }),
    check("password", "password required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = router;
