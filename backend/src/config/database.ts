import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.DB_HOST && process.env.DB_HOST !== 'db' && process.env.DB_HOST !== 'localhost';

const sequelize = new Sequelize(
    process.env.DB_NAME || 'techmart_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '123456',
    {
        host: process.env.DB_HOST || 'db',
        dialect: 'postgres',
        logging: false,
        ...(isProduction && {
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            },
        }),
    }
);
const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

export default sequelize;
export { connectDB };