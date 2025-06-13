import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


const protectRoute = async  (req,res,next)=>{

    try {
        // console.log("req.cookies", req.cookies.token);
        const token = req.cookies.token;
        // console.log("token", token);
        if(!token){
           return res.status(401).json({ message: "Unauthorized" })  
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"not authorized token"})
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found"});

        }

        req.user = user;
        
        next()

    } catch (error) {
        res.status(500).json({message:"Error internal",error:error.message});
    }

}

export { protectRoute };