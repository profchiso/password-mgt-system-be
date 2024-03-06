const { User } = require("../models/User");
const {
  hashUserPassword,
  decryptPassword,
} = require("../utils/passwordManipulation");
const { generateAccessToken } = require("../utils/tokenManagement");
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
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
      error: [{ msg: "Could not create user something went wrong" }],
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //CHECK IF USER EXIST
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({
        statusCode: 400,
        responseText: "FAIL",
        errors: [{ msg: `Invalid user credentials` }],
      });
    }

    //COMPARE ENTERED PASSWORD WITH HASHED PASSWORD
    if (!(await decryptPassword(password, existingUser.password))) {
      return res.status(400).json({
        statusCode: 400,
        responseText: "FAIL",
        errors: [{ msg: `Invalid user credentials` }],
      });
    }
    //JWT PAYLOAD FOR SIGNED IN USER
    const payLoad = {
      user: {
        id: existingUser.id,
      },
    };
    let accessToken = await generateAccessToken(payLoad);
    let resource = { ...existingUser._doc };
    delete resource.password;
    req.user = resource;
    res.status(200).json({
      statusCode: 200,
      responseText: "SUCCESS",
      data: {
        msg: `Login successful`,
        resource,
        extra: { accessToken },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      statusCode: 500,
      responseText: "FAIL",
      error: [{ msg: "Something went wrong" }],
    });
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
      error: [{ msg: "Something went wrong" }],
    });
  }
};
