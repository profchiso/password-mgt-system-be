const { Router } = require("express");

const { register, login, getUsers } = require("../controllers/user");

const userRoutes = Router();

userRoutes.post("/", register);
userRoutes.get("/login", login);
userRoutes.get("/", getUsers);

module.exports = { userRoutes };
