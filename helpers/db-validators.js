const Role = require("../models/role");
const User = require("../models/user");
const isValidRole = async (role = "") => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    
  }
};

const emailExists = async (email = "") => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error(`email ${email} does already exist in the database`);
  }
};

const existUserById = async (id) => {

    const existUser = await User.findById(id);

    if(!existUser) {
        throw new Error(`User with id: ${id} not exist in the database`);
    }

}

module.exports = { isValidRole, emailExists, existUserById };
