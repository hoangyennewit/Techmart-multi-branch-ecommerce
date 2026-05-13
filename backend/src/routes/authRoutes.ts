import express from 'express';
import passport from 'passport';
import { authenticateToken } from '../middlewares/authMiddleware';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {session: false}),
    authController.googleCallback
);
router.get("/profile", authenticateToken, authController.getProfile);
router.post('/login', authController.login); // Đăng nhập bằng email và mật khẩu

export default router;