const generateJwt = require("../helpers/generate-jwt");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "The user does not exist" });
    }
    if (!user.status) {
      return res.status(400).json({ message: "Status: false" });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Password is not correct" });
    }
    const token = await generateJwt(user.id, user.role);

    res.json({ user, token });
  } catch (error) {
    console.log('error: ' + error);
    res.status(500).json({ message:'Talk with the admin', error: error});
  }
};

module.exports = login;
