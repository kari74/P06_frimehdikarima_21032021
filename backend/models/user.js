const mongoose = require('mongoose');//import Mongoose
const uniqueValidator = require('mongoose-unique-validator');//email unique


// schema qui permet de s'assurer que 2 utilisateurs ne peuvent pas utiliser la meme adresse mails 
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);