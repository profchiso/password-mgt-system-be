const { User } = require("../models/User");
const { hashUserPassword } = require("../utils/passwordManipulation");
exports.register = async (req, res) => {
  try {
    const { password } = req.body;
    let hashedPassword = await hashUserPassword(password);
    req.body.password = hashedPassword;
    const createdUser = await User.create(req.body);
    res.status(201).json({
      statusCode: 201,
      responseText: "SUCCESS",
      data: { resource: createdUser, msg: "User created successfully" },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      responseText: "FAIL",
      data: { resource: {}, msg: "Could not create user something went wrong" },
    });
  }
};
exports.login = async (req, res) => {
  try {
  } catch (error) {}
};
exports.getUsers = async (req, res) => {
  try {
  } catch (error) {}
};
