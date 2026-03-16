import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import {connectDB} from './config/database';
import authRoutes from './routes/authRoutes';
import passport from 'passport';
import './config/passport';

app.use(passport.initialize());
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
const start = async() => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
start();