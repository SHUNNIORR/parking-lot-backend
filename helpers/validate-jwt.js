const { response, request } = require("express");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const validateJwt = async(req = request, res = response, next) => {
  const token = req.header("x-token");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const{uid}=jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if( !user ) {
        return res.status(401).json({
            msg: 'Token not valid - user does not exist in DB'
        })
    }

    // Verificar si el uid tiene estado true
    if ( !user.status ) {
        return res.status(401).json({
            msg: 'Token not valid - user with status: false'
        })
    }
      
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = validateJwt;
