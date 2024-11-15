const express = require("express");
const { connectDb } = require("./src/utils/database");
const routerGroups = require("./src/api/routes/groups.routes");
const routesUser = require("./src/api/routes/user.routes");

const env = require("dotenv");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const server = express();

env.config();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

server.use(cors());



server.use(express.json());
connectDb();




server.use("/groups", routerGroups);

server.use("/user", routesUser);




const PORT = 5000;
server.listen(PORT, () => {
  console.log("Escuchando por el puerto " + PORT);
});
