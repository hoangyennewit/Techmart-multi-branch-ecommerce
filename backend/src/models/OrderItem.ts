import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class OrderItem extends Model {
    public id!: number;
    public orderId!: number;
    public productId!: number;
    public quantity!: number;
    public price!: number;
}

OrderItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'ma_chi_tiet_don_hang'
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ma_don_hang'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ma_san_pham'
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'so_luong'
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'gia_ban'
        }
    },
    {
        sequelize,
        tableName: 'chi_tiet_don_hang',
        timestamps: false,
    }
)