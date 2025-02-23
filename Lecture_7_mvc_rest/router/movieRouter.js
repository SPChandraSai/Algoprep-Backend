const express = require('express');
const movieRouter = express.Router();
const { createMovie, getAllMovie, getMovie, deleteMovie } = require("../controller/movieController.js");
const { protectedRouteMiddleware, isAdminMiddleWare } = require("../controller/authController.js");

movieRouter
    .post("/", createMovie)
    .get("/api/movie", protectedRouteMiddleware, isAdminMiddleWare, getAllMovie)
    .get("/api/movie/:id", getMovie)
    .delete("/api/movie/:id", protectedRouteMiddleware, deleteMovie);

module.exports = movieRouter;