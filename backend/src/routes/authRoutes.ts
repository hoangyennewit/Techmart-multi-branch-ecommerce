import express from 'express';
import passport from 'passport';
import * as authController from '../controllers/authController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', passport.authenticate('google', {session: false}),
    authController.googleCallback
);
router.get("/profile", authenticateToken, authController.getProfile);

export default router;