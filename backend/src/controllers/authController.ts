import { Request, Response } from "express";
import * as authService from "../services/authService";

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user;
  console.log("🔍 googleCallback - user:", user);
  if (!user) {
    console.log("❌ User not found after Google auth");
    return res.redirect("http://localhost:5173/login?error=auth_failed");
  }
  const token = authService.generateToken(user);
  console.log("✅ Token created:", token.substring(0, 20) + "...");
  console.log("✅ Đăng nhập thành công user:", (user as any).email);
  const redirectUrl = `http://localhost:5173/?token=${token}`;
  console.log("🔗 Redirect to:", redirectUrl);
  res.redirect(redirectUrl);
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await authService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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