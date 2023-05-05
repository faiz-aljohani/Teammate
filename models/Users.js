const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
});

export const UserModel = mongoose.model("users", UserSchema);