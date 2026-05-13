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

import bcrypt from 'bcrypt';
import { User } from '../models/User';
import sequelize from '../config/database';

router.get('/dev/fix-db', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('123456', 10);
        await User.update({ password: hashedPassword }, { where: {} });
        
        // Also update product images in the san_pham table (if we had a Product model, but we don't seem to have one in models/, let's just use raw query)
        await sequelize.query(`
            UPDATE hinh_anh_san_pham
            SET url = 'https://picsum.photos/400/400?random=' || ma_hinh_anh
            WHERE url NOT LIKE 'http%';
        `);

        res.json({ message: 'Database fixed successfully. Passwords set to 123456 and images updated.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: String(error) });
    }
});

export default router;