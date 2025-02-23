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
const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");
const movieRouter = require("./router/movieRouter.js");

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);

app.listen(3000, function () {
    console.log("server started on port 3000")
})
