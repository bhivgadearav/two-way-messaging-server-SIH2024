const mongoose = require('mongoose');

// Define the Message schema
const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // Change from ObjectId to String
  receiver: { type: String, required: true }, // Change from ObjectId to String
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
