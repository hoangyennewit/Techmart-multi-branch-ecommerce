import { Request, Response } from "express";
import authService from "../services/authService";

export class AuthController {
  public googleCallback = (req: Request, res: Response): void => {
    const user = req.user;

    console.log("🔍 googleCallback - user:", user);
    if (!user) {
      console.log("❌ User not found after Google auth");
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
      res.redirect(`${frontendUrl}/login?error=auth_failed`);
      return;
    }
    const token = authService.generateToken(user);
    console.log("✅ Token created:", token.substring(0, 20) + "...");
    console.log("✅ Đăng nhập thành công user:", (user as any).email);
    
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const redirectUrl = `${frontendUrl}/?token=${token}`;
    console.log("🔗 Redirect to:", redirectUrl);
    res.redirect(redirectUrl);
  };

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "Unauthorized" });
        return;
      }
      const user = await authService.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({
        id: user.id,
        email: user.email,
        ho_ten: user.ho_ten,
        ma_vai_tro: user.ma_vai_tro,
      });
    } catch (error) {
      console.error("Error getting profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "Vui lòng nhập đầy đủ email và mật khẩu." });
        return;
      }
      const user = await authService.loginWithEmail(email, password);
      const token = authService.generateToken(user);
      console.log("✅ Đăng nhập truyền thống thành công user:", user.email);

      res.status(200).json({
        message: "Đăng nhập thành công",
        token: token,
        user: {
          id: user.id,
          email: user.email,
          ho_ten: user.ho_ten,
          ma_vai_tro: user.ma_vai_tro,
        }
      });
    } catch (error: any) {
      console.error("❌ Lỗi đăng nhập truyền thống:", error.message);
      res.status(401).json({ message: error.message || "Đăng nhập thất bại." });
    }
  };
}

export default new AuthController();