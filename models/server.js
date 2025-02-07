const express = require("express");

const cors = require("cors");
const dbConnection = require("../database/config");
const vehicleType = require("./vehicle-type");
const role = require("./role");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";
    this.authRoutePath = "/api/auth";
    this.ticketRoutePath = "/api/ticket";
    // db connection
    this.connectDb();


    // middlewares
    this.middlewares();

    // rutas de mi app
    this.routes();

    // create roles
    async function createRoles() {
      await role.create({role:'ADMIN_ROLE'});
      await role.create({role:'USER_ROLE'});
    }
    createRoles();

    // create vehicle types
    async function createVehicleTypes() {
      await vehicleType.create({ type: 'CAR' });
      await vehicleType.create({ type: 'MOTORCYCLE' });
      await vehicleType.create({ type: 'TRUCK' });
    }
    
    //createVehicleTypes();
  }

  async connectDb(){
    await dbConnection()
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json())

    //this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.authRoutePath, require("../routes/auth"));
    this.app.use(this.usersRoutePath, require("../routes/user"));
    this.app.use(this.ticketRoutePath, require("../routes/ticket"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en ", this.port);
    });
  }
}

module.exports = Server;
