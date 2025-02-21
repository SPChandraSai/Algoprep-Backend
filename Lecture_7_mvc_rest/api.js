const mongoose = require("mongoose");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config();
/******************db connection****************/
const dbLink = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.nfmi4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err));

/******************routes and their handlers****************/
app.use(express.json());
app.use(cookieParser());

/*****************auth methods and routes****************/
const { loginHandler, signupHandler, logoutHandler, protectedRouteMiddleware, profileHandler, isAdminMiddleWare } = require("./authController");
app.post("/login", loginHandler);
app.post("/signup", signupHandler);
app.get("/logout", logoutHandler);
app.get("/profile", protectedRouteMiddleware, profileHandler);

/*************user routes and their handlers*************/
const { createUser, getAllUser, getUser, deleteUser } = require("./userController");
app.post("/user", createUser);
app.get("/user", getAllUser);
app.get("/user/:id", getUser);
app.delete("/user/:id", protectedRouteMiddleware, deleteUser);

app.listen(3000, function () {
    console.log("server started on port 3000")
})
