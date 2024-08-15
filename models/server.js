const express = require("express");

const cors = require("cors");
const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";
    this.authRoutePath = "/api/auth";
    // db connection
    this.connectDb();


    // middlewares
    this.middlewares();

    // rutas de mi app
    this.routes();
  }

  async connectDb(){
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json())

    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.authRoutePath, require("../routes/auth"));
    this.app.use(this.usersRoutePath, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en ", this.port);
    });
  }
}

module.exports = Server;
