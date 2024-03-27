// ===========================================
// Last edited: March 25 2024
// Editors: Hamza and Ave
// ===========================================

const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5001;


// ===========================================
// Route and other configuration
// ===========================================

const dbUser = "codefetch";
const clusterName = "Cluster0";
const MONGODB_URI = `mongodb+srv://${dbUser}:${process.env.MONGODB_PASSWORD}@cluster0.e1en0n4.mongodb.net/?retryWrites=true&w=majority&appName=${clusterName}`;
// mongoose.connect(MONGODB_URI)
//    .then(() => {
//       console.log("Database connection established");
//    })
//    .catch((err) => {
//       console.error(`ERROR: ${err}`);
//    });

app.use(express.static("public"));
require("dotenv").config();


// ===========================================
// Routing
// ===========================================

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
});

app.get("/token/:service", (req, res) => {
   const service = req.params.service;
   // console.log(service.toUpperCase() + "_TOKEN", process.env.GITHUB_TOKEN);
   res.send(process.env[service.toUpperCase() + "_TOKEN"] || "No token found");
});


// ===========================================
// Listen on port
// ===========================================

app.listen(PORT, () => {
   console.log("Server is running on port " + PORT);
});


// ===========================================
// Development
// ===========================================

const saltRounds = 10;
const password = "Admin@123";

app.get("/api", (req, res) => {
   res.json({
      "users": 
      [
         {
            "name": "user1",
            "email": "fake@email.com",
            "id": 462354
         },
         {
            "name": "user1",
            "email": "fake@email.com",
            "id": 262354
         },
         {
            "name": "user1",
            "email": "fake@email.com",
            "id": 962554
         }
      ]
   });
});