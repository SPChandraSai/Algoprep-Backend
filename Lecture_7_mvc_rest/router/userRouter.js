const express = require('express');
const userRouter = express.Router();
const { createUser, getAllUser, getUser, deleteUser } = require("../controller/userController");
const { protectedRouteMiddleware, isAdminMiddleWare } = require("../controller/authController");

userRouter
    .post("/", createUser)
    .get("/", protectedRouteMiddleware, isAdminMiddleWare, getAllUser)
    .get("/:id", getUser)
    .delete("/:id", protectedRouteMiddleware, deleteUser);

module.exports = userRouter;