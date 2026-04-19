import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class OrderModel extends Model {
    public id!: number;
    public userId!: number;
    public totalAmount!: number
    public fullName!: string;
    public phoneNumber!: string;
    public shippingAddress!: string;
    public paymentMethod!: 'COD' | 'VNPAY' | 'MOMO';
    public paymentStatus!: 'pending' | 'paid' | 'failed' | 'refunded';
    public orderStatus!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    public note?: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OrderModel.init (
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'ma_don_hang',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ma_nguoi_dung',
        },
        totalAmount: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'tong_tien',
        },
        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            field: 'ho_ten',
        },
        phoneNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            field: 'so_dien_thoai',
        },
        shippingAddress: {
            type: DataTypes.TEXT,
            allowNull: false,
            field: 'dia_chi_giao_hang',
        },
        paymentMethod: {
            type: DataTypes.ENUM('COD', 'VNPAY', 'MOMO'),
            allowNull: false,
            field: 'phuong_thuc_thanh_toan',
        },
        paymentStatus: {
            type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
            allowNull: false,
            defaultValue: 'pending',
            field: 'trang_thai_thanh_toan',
        },
        orderStatus: {
            type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
            field: 'trang_thai_don_hang',
        },
        note: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'ghi_chu',
        },
    },
    {
        sequelize,
        tableName: 'don_hang',
        timestamps: true,
        underscored: true
    }
);