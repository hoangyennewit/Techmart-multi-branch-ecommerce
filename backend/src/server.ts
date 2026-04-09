import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import {connectDB} from './config/database';
import authRoutes from './routes/authRoutes';
import paymentRoute from './routes/paymentRoute';
import orderRoute from './routes/orderRoute';
import passport from 'passport';
import './config/passport';
import './models';
import productRoute from './routes/productRoute';

app.use(passport.initialize());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoute);
app.use('/api/payments', paymentRoute);
app.use('/api/orders', orderRoute);

const PORT = process.env.PORT || 5000;
const start = async() => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
start();