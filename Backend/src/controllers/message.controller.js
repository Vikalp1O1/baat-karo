import { sendMessage, userForSideBar,getConversations } from "../services/message.service.js";

const getUserForSidebar = async (req,res) => {
    try {
        const users = await userForSideBar({loggedInUser:req.user._id});
        res.status(200).json({
            message:"users fetched",
            data:users
        })
    } catch (error) {
       res.status(500).json({
            message:"Error fetching users for sidebar",
            error:error.message
        })
    } 
};

const getConversationsOfUser = async (req, res) => {

    
    try {
        const message = await getConversations({senderId:req.user._id,receiverId:req.params.id});
        res.status(200).json({
            message: "Conversations fetched successfully",
            data: message
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching conversations",
            error: error.message
        });
    }
};

const messageSending = async (req,res)=>{

    try {
        
        const message = await sendMessage({text:req.body.text,image:req.body.image,senderId:req.user._id,receiverId:req.params.id});
        res.status(200).json({
            message: "Message sent successfully",
            data: message
        });
    } catch (error) {
        res.status(500).json({
            message: "Error sending message",
            error: error.message
        });
    }
};

export { getUserForSidebar, getConversationsOfUser,messageSending };