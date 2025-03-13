// // models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   username: String,
//   hasVoted: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('User', UserSchema);
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  aadhaar: String,
  phone: String,
  age: Number,
  voterId: String,
  hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
