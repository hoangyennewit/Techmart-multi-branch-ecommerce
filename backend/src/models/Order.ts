import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class OrderModel extends Model {
    public id!: number;
    public userId!: number;
    public totalAmount!: number
    public orderStatus!: 'cho_xac_nhan' | 'da_xac_nhan' | 'dang_giao' | 'hoan_thanh' | 'da_huy';    public note?: string;
    public readonly orderDate!: Date;
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
        orderStatus: {
            type: DataTypes.ENUM('cho_xac_nhan', 'da_xac_nhan', 'dang_giao', 'hoan_thanh', 'da_huy'),
            allowNull: false,
            defaultValue: 'cho_xac_nhan',
            field: 'trang_thai',
        },
        orderDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'ngay_dat',
        }
    },
    {
        sequelize,
        tableName: 'don_hang',
        timestamps: false,
        underscored: true
    }
);