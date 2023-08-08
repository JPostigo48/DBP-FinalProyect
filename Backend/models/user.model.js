const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  surnames: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    default: "Somewhere"
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Este e-mail ya está registrado"],
  },
  status: {
    type: String,
    trim: true,
    default: "Hola, soy un humano y me gusta vivir",
  },
  followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  password: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

userSchema.methods = {
  authenticate: function (plainText) {
    return plainText == this.password;
  },
}

module.exports = mongoose.model("User", userSchema);