import { DataTypes, Model } from "sequelize"; // Sequelize là một ORM (Object-Relational Mapping) giúp tương tác với cơ sở dữ liệu một cách dễ dàng bằng cách sử dụng các mô hình đối tượng thay vì viết câu lệnh SQL trực tiếp. Model là lớp cơ sở để định nghĩa các mô hình dữ liệu, còn DataTypes cung cấp các kiểu dữ liệu để định nghĩa các trường trong mô hình.
import sequelize from "../config/database";

export interface PaymentEntity {
    ma_thanh_toan: number;
    ma_don_hang: number;
    phuong_thuc: 'COD' | 'VNPAY' | 'MOMO';
    trang_thai: 'cho_xu_ly' | 'thanh_cong' | 'that_bai';
    ma_giao_dich?: string;
    so_tien: number;
    ngay_tao: Date;
    ngay_thanh_toan?: Date;
}

export type CreatePaymentEntity = Omit<PaymentEntity, 'ma_thanh_toan' | 'ngay_tao' | 'ngay_thanh_toan'>;
export class Payment extends Model<PaymentEntity, CreatePaymentEntity> {
    public ma_thanh_toan!: number;
    public ma_don_hang!: number;
    public phuong_thuc!: 'COD' | 'VNPAY' | 'MOMO';
    public trang_thai!: 'cho_xu_ly' | 'thanh_cong' | 'that_bai';
    public ma_giao_dich?: string | null;
    public so_tien!: number;
    public ngay_tao!: Date;
    public ngay_thanh_toan?: Date;
}

Payment.init(
    {
        ma_thanh_toan: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'ma_thanh_toan',
        },
        ma_don_hang: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'ma_don_hang',
        },
        phuong_thuc: {
            type: DataTypes.ENUM('COD', 'VNPAY', 'MOMO'),
            allowNull: false,
            field: 'phuong_thuc',
        },
        trang_thai: {
            type: DataTypes.ENUM('cho_xu_ly', 'thanh_cong', 'that_bai'),
            allowNull: false,
            defaultValue: 'cho_xu_ly',
            field: 'trang_thai',
        },
        ma_giao_dich: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'ma_giao_dich',
        },
        so_tien: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'so_tien',
        },
        ngay_tao: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            field: 'ngay_tao',
        },
        ngay_thanh_toan: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'ngay_thanh_toan',
        },
    },
    {
        sequelize,
        tableName: 'thanh_toan',
        timestamps: false,
    }
)

export default Payment;