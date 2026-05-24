import jwt from "jsonwebtoken";

/**
 * Dùng đúng secret mà authService dùng trong production.
 * Integration test phải tạo token THẬT để test middleware thật.
 */
export const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-prod";

const sign = (payload: object) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

/**
 * Bộ token sẵn dùng cho từng role.
 * ma_vai_tro theo đúng bảng vai_tro trong DB:
 *   1=ADMIN, 2=GIAM_DOC, 3=QL_SP, 4=QL_CH, 5=CSKH, 6=NV_BAN_HANG, 7=NV_KHO, 8=KHACH_HANG
 */
export const tokens = {
  admin:    () => sign({ id: 1,  email: "admin@shop.vn",      ma_vai_tro: 1 }),
  director: () => sign({ id: 2,  email: "giamdoc@shop.vn",    ma_vai_tro: 2 }),
  staff:    () => sign({ id: 7,  email: "sale1@shop.vn",       ma_vai_tro: 6 }),
  customer: () => sign({ id: 11, email: "huy@gmail.com",       ma_vai_tro: 8 }),
  expired:  () => jwt.sign({ id: 11, ma_vai_tro: 8 }, JWT_SECRET, { expiresIn: "-1s" }),
  invalid:  () => "this.is.not.a.valid.token",
};

/** Trả về header Authorization chuẩn cho supertest */
export const bearer = (token: string) => `Bearer ${token}`;