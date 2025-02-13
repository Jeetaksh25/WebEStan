import { getReceiverSocketId,io } from "../lib/socket.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";


export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select('-password');

        res.status(200).json({filteredUsers});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const chat = await Chat.find({
            $or: [
                {senderId:senderId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:senderId}
            ]
        })

        res.status(200).json(chat)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const sendMessage = async (req,res) => {
    try {
        const {text} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        const newMessage = new Chat({
            senderId,
            receiverId,
            text,
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}