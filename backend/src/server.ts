import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import {connectDB} from './config/database';
import authRoutes from './routes/authRoutes';
import paymentRouter from './routes/paymentRoute';
import oderRouter from './routes/orderRoute';
import passport from 'passport';
import './config/passport';
import './models';

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRouter);
app.use('/api/orders', oderRouter);

const PORT = process.env.PORT || 5000;
const start = async() => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
start();