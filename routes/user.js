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
const validateJwt = require("../helpers/validate-jwt");
const { isAdmin } = require("../helpers/validate-roles");
const router = Router();

router.get("/",
  [validateJwt], usersGet);
router.post(
  "/",
  [
    validateJwt,
    check("name", "name is empty").not().isEmpty(),
    check("email", "email is not valid").isEmail(),
    check("email").custom(emailExists),
    check("password", "password is not valid").isLength({ min: 6 }),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPost
);
router.put(
  "/:id",
  [ 
    validateJwt,
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existUserById),
    check("role").custom(isValidRole),
    validateFields,
  ],
  usersPut
);
router.delete(
  "/:id",
  [
    validateJwt,
    isAdmin,
    check("id", "Not a valid id").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  usersDelete
);

module.exports = router;
