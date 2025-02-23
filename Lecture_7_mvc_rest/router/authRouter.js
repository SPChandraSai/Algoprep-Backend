const express = require('express');
const authRouter = express.Router();

const { loginHandler, signupHandler, logoutHandler, protectedRouteMiddleware, profileHandler } = require("../controller/authController");
authRouter
    .post("/login", loginHandler)
    .post("/signup", signupHandler)
    .get("/logout", logoutHandler)
    .get("/profile", protectedRouteMiddleware, profileHandler);

module.exports = authRouter;