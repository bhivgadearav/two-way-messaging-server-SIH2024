const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const Message = require('./models/Message'); // Import your Message model
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*', // Allow requests from all origins (modify this for better security)
  },
});

const uri = 'replace-with-your-mongodb-uri';

// MongoDB connection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected', socket.id);

  // Load previous messages between two users
  socket.on('loadChat', async ({ senderId, receiverId }) => {
    try {
      // Fetch messages between the two users
      const messages = await Message.find({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      }).sort({ createdAt: 1 }); // Sort messages by timestamp

      // Send the messages to the client
      socket.emit('loadMessages', messages);
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  });

  // Handle incoming messages
  socket.on('message', async ({ senderId, receiverId, message }) => {
    try {
      // Create a new message document
      const newMessage = new Message({
        sender: senderId,
        receiver: receiverId,
        text: message
      });

      // Save the message in MongoDB
      await newMessage.save();

      // Emit the message to the receiver's socket
      io.to(receiverId).emit('message', {
        sender: senderId,
        receiver: receiverId,
        text: message,
        createdAt: newMessage.createdAt
      });

      // Also send the message back to the sender's socket for local display
      socket.emit('message', {
        sender: senderId,
        receiver: receiverId,
        text: message,
        createdAt: newMessage.createdAt
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
