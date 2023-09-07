const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter firstname"],
    },
    email: {
      type: String,
      required: [true, "Please enter firstname"],
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Users', userSchema)