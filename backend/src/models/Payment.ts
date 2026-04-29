import { DataTypes, Model } from "sequelize"; // Sequelize là một ORM (Object-Relational Mapping) giúp tương tác với cơ sở dữ liệu một cách dễ dàng bằng cách sử dụng các mô hình đối tượng thay vì viết câu lệnh SQL trực tiếp. Model là lớp cơ sở để định nghĩa các mô hình dữ liệu, còn DataTypes cung cấp các kiểu dữ liệu để định nghĩa các trường trong mô hình.
import sequelize from "../config/database";

export interface PaymentEntity {
  ma_thanh_toan: number;
  ma_don_hang: number;
  phuong_thuc: "COD" | "VNPAY" | "MOMO" | "ZALOPAY";
  trang_thai: "cho_xu_ly" | "thanh_cong" | "that_bai";
  ma_giao_dich?: string | null;
  vnp_response_code?: string | null; // Lưu mã lỗi vnp_ResponseCode
  so_tien: number;
  ngay_tao: Date;
  ngay_thanh_toan?: Date | null;
}


export type CreatePaymentEntity = Omit<
  PaymentEntity,
  "ma_thanh_toan" | "ngay_tao" | "ngay_thanh_toan"
>;

export class Payment extends Model<PaymentEntity, CreatePaymentEntity> implements PaymentEntity {
  public ma_thanh_toan!: number;
  public ma_don_hang!: number;
  public phuong_thuc!: "COD" | "VNPAY" | "MOMO" | "ZALOPAY";
  public trang_thai!: "cho_xu_ly" | "thanh_cong" | "that_bai";
  public ma_giao_dich!: string | null;
  public vnp_response_code!: string | null; // Lưu mã lỗi vnp_ResponseCode
  public so_tien!: number;
  public ngay_tao!: Date;
  public ngay_thanh_toan!: Date | null;
}

Payment.init(
  {
    ma_thanh_toan: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ma_don_hang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phuong_thuc: {
      type: DataTypes.ENUM("COD", "VNPAY", "MOMO", "ZALOPAY"),
      allowNull: false,
    },
    trang_thai: {
      type: DataTypes.ENUM("cho_xu_ly", "thanh_cong", "that_bai"),
      allowNull: false,
      defaultValue: "cho_xu_ly",
    },
    ma_giao_dich: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    vnp_response_code: {
      type: DataTypes.STRING(10), // Lưu mã 00, 07, 24...
      allowNull: true,
    },
    so_tien: {
      type: DataTypes.INTEGER, // Sửa từ DECIMAL sang INTEGER cho khớp SQL
      allowNull: false,
    },
    ngay_tao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ngay_thanh_toan: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "thanh_toan",
    timestamps: false,
    underscored: true, // Nếu cột trong SQL là ma_thanh_toan thì nên bật cái này hoặc dùng field mapping
  }
);

export default Payment;
