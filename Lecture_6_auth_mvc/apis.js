const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

/******************db connection****************/
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nfmi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err));

/*********************************/

/******************routes and their handlers****************/
const {createUser, getAllUser, getUser, deleteUser}=require("./userController");

app.use(express.json());

app.post("/user", createUser);

app.get("/user", getAllUser);

app.get("/user/:id", getUser);

app.delete("/user/:id", deleteUser);

//HW for the class
app.post("/login", loginHandler);
app.post("/signup", signupHandler);
app.use(protectedRoute);
app.get("/profile", profileHandler);

app.listen(3000, function () {
    console.log("server started on port 3000")
})
