import Message from '../model/Message.js'; // Adjust the path as needed
import mongoose from 'mongoose';

// Create a new message
export const createMessage = async (req, res) => {
    try {
      const { from, to, message } = req.body;
      
      if (!from || !to || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newMessage = await Message.create({
        Chatusers: [from, to],
        message: message,
        sender: from
      });
      console.log("message added successfuly");
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error creating message:", error);  // Log the error to the console
      return res.status(500).json('Internal server error');
    }
  };
  

// Get all messages for a chat
export const getMessages = async (req, res) => {
  try {
    const  from = req.params.user1Id;
    const  to = req.params.user2Id;
    const newmessage = await Message.find({
        Chatusers:{
            $all:[from,to]
        }
    }).sort({updatedAt : 1});
    const allmessage=newmessage.map((msg)=>{
        return{
            myself : msg.sender.toString()===from,
            message:msg.message
        }
    })
    return res.status(200).json(allmessage);


  } catch (error) {
    
    return res.status(500).json("Internal Server error");
  }
};

// Get a single message by ID
export const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a message by ID
export const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { Chatusers, message, sender } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const updatedMessage = await Message.findByIdAndUpdate(id, { Chatusers, message, sender }, { new: true });

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json(updatedMessage);
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a message by ID
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid message ID' });
    }

    const deletedMessage = await Message.findByIdAndDelete(id);

    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
