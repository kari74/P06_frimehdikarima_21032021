const mongoose = require('mongoose');//import Mongoose
const uniqueValidator = require('mongoose-unique-validator');//email unique

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);