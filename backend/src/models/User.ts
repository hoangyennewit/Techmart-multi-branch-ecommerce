import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class User extends Model {
    public id!: number;
    public ho_ten!: string;
    public email!: string;
    public googleId!: string | null;
    public ma_vai_tro!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'ma_nguoi_dung',
        },
        ho_ten: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'ho_ten',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'mat_khau',
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
            field: 'google_id',
        },
        loginType: {
            type: DataTypes.STRING,
            defaultValue: 'google',
            field: 'kieu_dang_nhap',
        },
        ma_vai_tro: {
            type: DataTypes.INTEGER,
            defaultValue: 8,
            field: 'ma_vai_tro',
        },
    },
    {
        sequelize,
        tableName: 'nguoi_dung',
        timestamps: false,
    }
);