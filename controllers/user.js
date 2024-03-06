const { User } = require("../models/User");
const { hashUserPassword } = require("../utils/passwordManipulation");
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).json({
        statusCode: 400,
        responseText: "FAIL",
        data: {
          resource: {},
          msg: "Email already exists",
        },
      });
    }

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
  } catch (error) {
    console.log(error);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      statusCode: 200,
      responseText: "SUCCESS",
      data: { resource: users, msg: "User fetched successfully" },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      responseText: "FAIL",
      data: { resource: {}, msg: "Something went wrong" },
    });
  }
};
