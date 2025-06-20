import jwt from 'jsonwebtoken';

const generatetoken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'7d'
    } );
       res.cookie('token',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development', 
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
       });

       return token;
};

export {    generatetoken};