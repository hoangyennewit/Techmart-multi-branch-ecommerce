import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { User } from './User';

export class Review extends Model {
    public ma_danh_gia!: number;
    public ma_san_pham!: number;
    public ma_nguoi_dung!: number;
    public noi_dung!: string;
    public so_sao!: number;
    public ngay_danh_gia!: Date;

    public user?: User;
}

Review.init(
    {
        ma_danh_gia: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        ma_san_pham: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ma_nguoi_dung: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        noi_dung: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        so_sao: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        ngay_danh_gia: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'danh_gia_san_pham',
        timestamps: false,
    }
);

// Define relationship if User is imported correctly
Review.belongsTo(User, { foreignKey: 'ma_nguoi_dung', as: 'user' });
User.hasMany(Review, { foreignKey: 'ma_nguoi_dung', as: 'reviews' });
