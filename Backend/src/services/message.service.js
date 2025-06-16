import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

const userForSideBar = async ({loggedInUser}) => {
 try {
     

  const filteredUser = await User.find({
    _id: { $ne: loggedInUser },
  }).select("-password");

  return filteredUser;
 } catch (error) {
    throw new Error("Error fetching users for sidebar: " + error.message);
 }
};

const getConversations = async ({receiverId,senderId})=>{
try {
    // const {id} = req.params;
    // const senderId = req.user._id;
    const conversations = await Message.find({
        $or:[
            { senderId: senderId, receiverId: receiverId },
            { senderId: receiverId, receiverId: senderId }
        ]
    });

    return conversations;
    
} catch (error) {
    throw new Error("Error fetching conversations: " + error.message);
}
};

const sendMessage = async({text,image,senderId,receiverId})=>{

    try {
        
        // const { text ,image}= req.body;
        // const {id:receiverId} = req.params.id;
        // const senderId = req.user._id;

        let imageUrl;
        if (image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url;
        }
        const newMessage = new Message({
            text,
            image: imageUrl,
            senderId,
            receiverId
        });

         await newMessage.save();

        const recieverSocketId = getReceiverSocketId(receiverId);
        if(recieverSocketId){

            io.to(recieverSocketId).emit("newMessage",newMessage);
        }

        return newMessage;


    } catch (error) {
        throw new Error("Error sending message: " + error.message);
    }
}

export { userForSideBar,getConversations,sendMessage };