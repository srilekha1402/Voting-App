// // models/Vote.js
// const mongoose = require('mongoose');

// const VoteSchema = new mongoose.Schema({
//   candidate: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Vote', VoteSchema);
const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  candidate: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vote', VoteSchema);
