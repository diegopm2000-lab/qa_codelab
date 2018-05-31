// user.js

const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  surname: String,
  loginname: String,
  password: String,
});

userSchema.plugin(mongooseHidden); // to hidden _id and __v in query results

module.exports = mongoose.model('User', userSchema);
