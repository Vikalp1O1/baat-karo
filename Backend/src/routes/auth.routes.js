import express from 'express';
import { signup,login,logout,userProfile, checkUser } from '../controllers/auth.controllers.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.put('/update-profile',protectRoute,userProfile);

router.get('/check',protectRoute,checkUser)

export default router;