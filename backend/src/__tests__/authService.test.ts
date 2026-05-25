import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthService } from "../../src/services/authService";
import { User } from "../../src/models";

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock("../../src/models", () => ({
  User: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("bcrypt");
jest.mock("jsonwebtoken");

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeUser = (overrides = {}) => ({
  id: 1,
  email: "test@gmail.com",
  password: "hashed_password",
  loginType: "local",
  ma_vai_tro: 8,
  googleId: null as string | null,
  save: jest.fn().mockResolvedValue(undefined),
  ...overrides,
});

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
    jest.clearAllMocks();
  });

  // ── loginWithEmail ──────────────────────────────────────────────────────────

  describe("loginWithEmail", () => {
    /**
     * Happy path cơ bản — đảm bảo flow chính hoạt động đúng.
     * Kiểm tra thêm bcrypt.compare được gọi với đúng tham số.
     */
    it("returns the user when email and password are correct", async () => {
      const mockUser = makeUser();
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.loginWithEmail("test@gmail.com", "correct_password");

      expect(result).toBe(mockUser);
      expect(bcrypt.compare).toHaveBeenCalledWith("correct_password", "hashed_password");
    });

    /**
     * Email không tồn tại trong DB — bước kiểm tra đầu tiên,
     * phải fail sớm để tránh gọi bcrypt không cần thiết.
     */
    it("throws if user is not found", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        service.loginWithEmail("nonexist@gmail.com", "123456")
      ).rejects.toThrow("Tài khoản không tồn tại");

      // bcrypt không được gọi khi chưa tìm thấy user
      expect(bcrypt.compare).not.toHaveBeenCalled();
    });

    /**
     * Tài khoản Google không có password — trường hợp user đăng ký
     * qua Google rồi thử login bằng email/pass.
     * Điều kiện: loginType='google' AND password=null.
     */
    it("throws if Google account has no password", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(
        makeUser({ loginType: "google", password: null })
      );

      await expect(
        service.loginWithEmail("user@gmail.com", "any")
      ).rejects.toThrow("Vui lòng sử dụng Google Login");
    });

    /**
     * Google user nhưng CÓ password (đã set thêm pass sau) — phải
     * được phép login bình thường. Điều kiện guard là loginType='google'
     * AND password=null, nên có password là được đi qua.
     */
    it("allows login if Google account has a password set", async () => {
      const mockUser = makeUser({ loginType: "googlessss", password: "hashed_extra_pass" });
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.loginWithEmail("user@gmail.com", "extra_pass");

      expect(result).toBe(mockUser);
    });

    /**
     * Sai mật khẩu — bcrypt.compare trả về false.
     * Quan trọng: phải throw đúng message, không được trả về null
     * (tránh frontend hiểu nhầm là tài khoản không tồn tại).
     */
    it("throws if password does not match", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(makeUser());
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.loginWithEmail("test@gmail.com", "wrong_password")
      ).rejects.toThrow("Mật khẩu không chính xác");
    });

    /**
     * findOne gọi đúng bằng email được truyền vào, không hardcode.
     * Đảm bảo không có bug kiểu dùng nhầm biến.
     */
    it("queries DB with the exact email provided", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await service.loginWithEmail("specific@email.com", "pass").catch(() => {});

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "specific@email.com" },
      });
    });

    /**
     * bcrypt.compare throw exception (lỗi hệ thống, không phải sai pass) —
     * lỗi phải bubble up thay vì bị nuốt im lặng.
     */
    it("propagates unexpected bcrypt error", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(makeUser());
      (bcrypt.compare as jest.Mock).mockRejectedValue(new Error("bcrypt crashed"));

      await expect(
        service.loginWithEmail("test@gmail.com", "pass")
      ).rejects.toThrow("bcrypt crashed");
    });
  });

  // ── generateToken ───────────────────────────────────────────────────────────

  describe("generateToken", () => {
    /**
     * Payload phải chứa đúng 3 field: id, email, ma_vai_tro.
     * Không thừa (tránh lộ thông tin nhạy cảm như password hash).
     */
    it("signs token with correct payload fields", () => {
      (jwt.sign as jest.Mock).mockReturnValue("mocked_jwt_token");
      const user = makeUser();

      service.generateToken(user);

      expect(jwt.sign).toHaveBeenCalledWith(
        { id: user.id, email: user.email, ma_vai_tro: user.ma_vai_tro },
        expect.any(String),
        { expiresIn: "7d" }
      );
    });

    /**
     * Thời hạn 7 ngày — nếu đổi thành 1d hay 30d sẽ fail.
     * Token tồn tại quá ngắn gây UX tệ, quá dài thì rủi ro bảo mật.
     */
    it("sets token expiry to 7 days", () => {
      (jwt.sign as jest.Mock).mockReturnValue("token");

      service.generateToken(makeUser());

      const [, , options] = (jwt.sign as jest.Mock).mock.calls[0];
      expect(options.expiresIn).toBe("7d");
    });

    /**
     * Mỗi role tạo ra token khác nhau vì ma_vai_tro khác nhau trong payload.
     * Đảm bảo ADMIN (role 1) và KHACH_HANG (role 8) không bị dùng lẫn token.
     */
    it("embeds different ma_vai_tro for different roles", () => {
      (jwt.sign as jest.Mock).mockReturnValue("token");

      service.generateToken(makeUser({ ma_vai_tro: 1 })); // ADMIN
      service.generateToken(makeUser({ ma_vai_tro: 8 })); // KHACH_HANG

      const adminPayload = (jwt.sign as jest.Mock).mock.calls[0][0];
      const customerPayload = (jwt.sign as jest.Mock).mock.calls[1][0];

      expect(adminPayload.ma_vai_tro).toBe(1);
      expect(customerPayload.ma_vai_tro).toBe(8);
    });

    /**
     * Giá trị trả về phải đúng là chuỗi jwt.sign trả về,
     * không bị wrapper hoặc biến đổi thêm.
     */
    it("returns the raw string from jwt.sign", () => {
      (jwt.sign as jest.Mock).mockReturnValue("raw_token_string");

      const token = service.generateToken(makeUser());

      expect(token).toBe("raw_token_string");
    });
  });

  // ── getUserById ─────────────────────────────────────────────────────────────

  describe("getUserById", () => {
    /**
     * Happy path — tìm thấy user, trả về đúng object.
     */
    it("returns the user when found", async () => {
      const mockUser = makeUser();
      (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.getUserById(1);

      expect(User.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBe(mockUser);
    });

    /**
     * ID không tồn tại — phải trả về null, không throw.
     * Caller chịu trách nhiệm xử lý null (trả 404 chẳng hạn).
     */
    it("returns null when user does not exist", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      const result = await service.getUserById(999);

      expect(result).toBeNull();
    });

    /**
     * findByPk được gọi với đúng ID được truyền vào.
     * Kiểm tra không bị hardcode hay dùng nhầm biến.
     */
    it("calls findByPk with the exact userId", async () => {
      (User.findByPk as jest.Mock).mockResolvedValue(null);

      await service.getUserById(42);

      expect(User.findByPk).toHaveBeenCalledWith(42);
      expect(User.findByPk).toHaveBeenCalledTimes(1);
    });
  });

  // ── upsertGoogleUser ────────────────────────────────────────────────────────

  describe("upsertGoogleUser", () => {
    const mockProfile = {
      id: "google_abc123",
      displayName: "Nguyễn Văn A",
      emails: [{ value: "user@gmail.com" }],
    };

    /**
     * User đã có trong DB (đăng ký local trước) — chỉ cập nhật googleId,
     * KHÔNG tạo mới để tránh duplicate account.
     */
    it("updates googleId for existing user and saves", async () => {
      const existingUser = makeUser({ googleId: null });
      (User.findOne as jest.Mock).mockResolvedValue(existingUser);

      const result = await service.upsertGoogleUser(mockProfile);

      expect(existingUser.googleId).toBe("google_abc123");
      expect(existingUser.save).toHaveBeenCalledTimes(1);
      expect(User.create).not.toHaveBeenCalled();
      expect(result).toBe(existingUser);
    });

    /**
     * User cũ đã có googleId khác — vẫn phải overwrite với googleId mới.
     * Xảy ra khi user đổi tài khoản Google.
     */
    it("overwrites an outdated googleId with the new one", async () => {
      const existingUser = makeUser({ googleId: "old_google_id" });
      (User.findOne as jest.Mock).mockResolvedValue(existingUser);

      await service.upsertGoogleUser(mockProfile);

      expect(existingUser.googleId).toBe("google_abc123");
      expect(existingUser.save).toHaveBeenCalledTimes(1);
    });

    /**
     * Email chưa có trong DB — tạo mới với đầy đủ thông tin.
     * Đặc biệt: role mặc định phải là 8 (KHACH_HANG), loginType='google'.
     */
    it("creates new user with correct defaults when email not found", async () => {
      const newUser = makeUser({ googleId: "google_abc123", loginType: "google" });
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(newUser);

      const result = await service.upsertGoogleUser(mockProfile);

      expect(User.create).toHaveBeenCalledWith(
        expect.objectContaining({
          googleId: "google_abc123",
          email: "user@gmail.com",
          loginType: "google",
          ma_vai_tro: 8,
        })
      );
      expect(result).toBe(newUser);
    });

    /**
     * findOne ném lỗi DB — exception phải bubble up,
     * không được bị catch im lặng.
     */
    it("propagates error from User.findOne", async () => {
      (User.findOne as jest.Mock).mockRejectedValue(new Error("DB connection lost"));

      await expect(service.upsertGoogleUser(mockProfile)).rejects.toThrow(
        "DB connection lost"
      );
    });

    /**
     * User.create ném lỗi (VD: vi phạm constraint unique email) —
     * exception phải bubble up để caller xử lý.
     */
    it("propagates error from User.create", async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockRejectedValue(
        new Error("unique constraint violation")
      );

      await expect(service.upsertGoogleUser(mockProfile)).rejects.toThrow(
        "unique constraint violation"
      );
    });

    /**
     * Lấy email từ profile.emails[0].value — kiểm tra đúng field được dùng.
     * Nếu Passport thay đổi cấu trúc profile thì test này sẽ fail sớm.
     */
    it("uses the first email from profile.emails array", async () => {
      const profileWithMultipleEmails = {
        ...mockProfile,
        emails: [
          { value: "primary@gmail.com" },
          { value: "secondary@gmail.com" },
        ],
      };
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (User.create as jest.Mock).mockResolvedValue(makeUser());

      await service.upsertGoogleUser(profileWithMultipleEmails);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "primary@gmail.com" },
      });
    });
  });
});