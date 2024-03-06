const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    index: true,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    require: true,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

exports.User = model("User", userSchema);
