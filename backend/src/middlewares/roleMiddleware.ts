import { Request, Response, NextFunction } from "express";
import { UserRole } from "../interfaces/roleInterface";

export const authorize = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Dùng (req as any) để TypeScript không báo lỗi thiếu biến 'user'
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ 
        message: "Người dùng chưa xác thực." 
      });
    }
    // Kiểm tra quyền
    if (!allowedRoles.includes(user.ma_vai_tro)) {
      return res.status(403).json({ 
        message: "Bạn không có quyền truy cập vào chức năng này." 
      });
    }
    next();
  };
};