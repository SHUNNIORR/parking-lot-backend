const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const usersGet = async(req, res = response) => {
  const { limit=5, skip=0 } = req.query;
  const query = {status:true};
  console.log('limite: ' + limit)
  const [total,users] = await Promise.all(
    [
      User.countDocuments(query),
      User.find(query).skip(Number(skip)).limit(Number(limit))
    ]
  )
  res.json({total,users});
};
const usersPost = async (req, res) => {
  const body = req.body;
  const user = new User(body);

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(body.password, salt);

  await user.save();
  res.json({ msg: "post API - controlador", User: user });
};
const usersPut = async (req, res) => {
  const { id } = req.params;

  const { password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json({ msg: "put API - controlador", user });
};
const usersDelete = async(req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json(user);
}; 

module.exports = {
  usersGet,
  usersPost,
  usersDelete,
  usersPut,
};
