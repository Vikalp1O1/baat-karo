import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getConversationsOfUser, getUserForSidebar, messageSending } from '../controllers/message.controller.js';
const router = express.Router();

router.get('/user',protectRoute,getUserForSidebar);
router.get('/:id',protectRoute,getConversationsOfUser);
router.post('/send/:id',protectRoute,messageSending);
export default router;                                                                              