const generateJwt = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
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
    const token = await generateJwt(user.id);

    res.json({ user, token });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).json({ message: "Talk with the admin", error: error });
  }
};

const googleSignIn = async (req, res) => {
  const { id_token } = req.body;

  try {
    const { email, name, picture } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      // Tengo que crearlo
      const data = {
        name,
        email,
        password: ":P",
        img: picture,
        google: true,
      };

      user = new User(data);
      await user.save();
    }
    if (!user.status) {
      return res.status(401).json({
        msg: "Talk with the admin, blocked user ",
      });
    }
    const token = await generateJwt(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: "token is not valid", error: error });
  }
};

module.exports = { login, googleSignIn };
