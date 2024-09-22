import express from 'express';
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} from '../controller/MsgController.js'; // Adjust the path as needed

const router = express.Router();

// Route to create a new message
router.post('/msg', createMessage);

// Route to get all messages for a chat
router.get('/get/chat/msg/:user1Id/:user2Id', getMessages);

// Route to get a single message by ID
router.get('/messages/:id', getMessageById);

// Route to update a message by ID
router.put('/messages/:id', updateMessage);

// Route to delete a message by ID
router.delete('/messages/:id', deleteMessage);

export default router;
