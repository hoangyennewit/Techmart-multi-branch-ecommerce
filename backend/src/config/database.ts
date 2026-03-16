// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(
//     process.env.DB_NAME || 'techmart_db',
//     process.env.DB_USER || 'postgres',
//     process.env.DB_PASSWORD || '123456',
//     {
//         host: process.env.DB_HOST || 'db',
//         dialect: 'postgres',
//         logging: false,
//     }
// );
// const connectDB = async() => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         process.exit(1);
//     }
// };

// export default sequelize;
// export { connectDB };

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'techmart_db',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '123456',
    {
        host: process.env.DB_HOST || 'db',
        dialect: 'postgres',
        logging: false,
    }
);

const connectDB = async () => {
    let retries = 10; // Thử lại 10 lần
    while (retries > 0) {
        try {
            await sequelize.authenticate();
            console.log('✅ Database Techmart đã kết nối thành công!');
            return; // Thoát vòng lặp khi thành công
        } catch (error) {
            retries--;
            console.error(`❌ DB chưa sẵn sàng, đang thử lại... (Còn ${retries} lần thử)`);
            // Đợi 5 giây trước khi thử lại
            await new Promise(res => setTimeout(res, 5000));
        }
    }
    console.error('🔥 Không thể kết nối Database sau nhiều lần thử. Đang tắt...');
    process.exit(1);
};

export default sequelize;
export { connectDB };