import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';
import http from 'http';

// Import your routes
import userRoutes from './routes/userRoute.js';
import roleRoutes from './routes/rolesRoute.js';
import activityRegistrationRoute from './routes/activityRegistrationRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import activityRoutes from './routes/activityRoute.js';
import EventRoute from './routes/EventRoute.js';
import EventImageRoute from './routes/eventImageRoute.js';
import UserProfilRoutes from './routes/userProfilRoutes.js';
import MsgRoute from './routes/MsgRoute.js';

// Convert URL to path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(userRoutes);
app.use(roleRoutes);
app.use(activityRoutes);
app.use(categoryRoutes);
app.use(activityRegistrationRoute);
app.use(EventRoute);
app.use(EventImageRoute);
app.use(UserProfilRoutes);
app.use(MsgRoute);

// Database connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Create the HTTP server and integrate it with Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log('New user connected:', socket.id);

  socket.on("addUser", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log('User added:', userId);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", { message: data.message, from: data.from });
      socket.to(sendUserSocket).emit("new-message-notification", { from: data.from });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
