const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const socketIo = require('socket.io');
const http = require('http');

const Vote = require('./models/Vote');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve Welcome Page FIRST (before static middleware)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'welcome.html'));
});

// Serve Voting Page
app.get('/vote', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve Thank You Page
app.get('/thankyou', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thankyou.html'));
});

// Serve Results Page
app.get('/results', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'results.html'));
});

// Serve static files (CSS, client-side JS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/voting_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error('MongoDB Error:', err));

// Handle vote submission
app.post('/submit-vote', async (req, res) => {
  const { name, aadhaar, phone, age, voterId, candidate } = req.body;

  if (age < 18) {
    return res.send("You are not eligible to vote.");
  }

  const existingUser = await User.findOne({ voterId });

  if (existingUser) {
    return res.send("You have already voted!");
  }

  const vote = new Vote({ candidate });
  await vote.save();

  const user = new User({ name, aadhaar, phone, age, voterId, hasVoted: true });
  await user.save();

  const results = await Vote.aggregate([
    { $group: { _id: '$candidate', count: { $sum: 1 } } }
  ]);

  io.emit('voteUpdate', results); // Emit live update
  res.redirect('/thankyou');
});

// API to get current results (for results.html)
app.get('/get-results', async (req, res) => {
  const results = await Vote.aggregate([
    { $group: { _id: '$candidate', count: { $sum: 1 } } }
  ]);
  res.json(results);
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log(' New client connected');
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});
