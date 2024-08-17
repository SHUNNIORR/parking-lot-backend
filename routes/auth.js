const { Router } = require("express");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validate-fields");
const {login,googleSignIn} = require("../controllers/auth");

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

router.post(
  "/google",
  [
    check("id_token", "Id token is required").not().isEmpty(),
    validateFields,
  ],
  googleSignIn
);

module.exports = router;
