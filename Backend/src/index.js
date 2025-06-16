import express from 'express';
import dotenv from 'dotenv';
import connectDB from './lib/db.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import messageRoutes from './routes/message.routes.js';
import cors from 'cors';
import { app, server, } from './lib/socket.js';
dotenv.config();

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true, 
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);

const PORT=process.env.PORT || 5001;

connectDB()
  .then(() => {
    console.log('Database connected successfully');
    server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
});
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
