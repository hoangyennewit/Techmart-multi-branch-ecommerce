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

import fs from 'fs';
import path from 'path';

router.get('/dev/seed-db', async (req, res) => {
    try {
        // 1. Read init.sql
        const sqlPath = path.join(__dirname, '../../sql/init.sql');
        const sqlScript = fs.readFileSync(sqlPath, 'utf8');

        // 2. Execute the entire SQL script
        // Note: pg driver handles multiple statements automatically
        await sequelize.query(sqlScript);

        // 3. Hash passwords to 123456
        const hashedPassword = await bcrypt.hash('123456', 10);
        await User.update({ password: hashedPassword }, { where: {} });

        res.json({ message: 'Database reset and seeded successfully. All passwords are set to 123456.' });
    } catch (error) {
        console.error('Error during database seed:', error);
        res.status(500).json({ error: String(error) });
    }
});

export default router;