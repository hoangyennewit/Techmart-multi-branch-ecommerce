import jwt from 'jsonwebtoken';
import { User } from '../models';
import bcrypt from 'bcrypt';
export class AuthService {
    public upsertGoogleUser = async (profile: any) => {
        try {
            const email = profile.emails?.[0]?.value;
            const googleId = profile.id;

            let user = await User.findOne({
                where: {email: email}
            });
            if(user) {
                user.googleId = googleId;
                await user.save();
            }
            else {
                user = await User.create({
                    googleId: googleId,
                    ho_ten: profile.displayName,
                    email: email,
                    password: `${googleId}`,
                    loginType: 'google',
                    ma_vai_tro: 8
                });
            }
            return user;
        }
        catch(error) {
            console.error('Lỗi tại authService:', error);
            throw error;
        }
    }; 

    public generateToken = (user: any) => {
        const token = jwt.sign(
            { id: user.id, email: user.email, ma_vai_tro: user.ma_vai_tro },
            process.env.JWT_SECRET || "your-secret-key-change-in-prod",
            { expiresIn: "7d" },
        );
        return token;
    };
    public getUserById = async (userId: number) => {
        const user = await User.findByPk(userId);
        return user;
    };

    public loginWithEmail = async (email: string, passwordInput: string) => {
        try {
            // 1. Tìm user theo email
            const user = await User.findOne({
                where: { email: email }
            });

            // 2. Kiểm tra tài khoản có tồn tại không
            if (!user) {
                throw new Error('Tài khoản không tồn tại');
            }

            // 3. Kiểm tra user này có phải tạo bằng Google không (để chặn login bằng pass)
            if (user.loginType === 'google' && !user.password) {
                 throw new Error('Tài khoản này được đăng nhập bằng Google. Vui lòng sử dụng Google Login.');
            }
            // 4. So sánh mật khẩu (Sử dụng bcrypt)
            const isMatch = await bcrypt.compare(passwordInput, user.password);
            
            if (!isMatch) {
                throw new Error('Mật khẩu không chính xác');
            }

            return user;
        } catch (error) {
            console.error('Lỗi tại authService (login truyền thống):', error);
            throw error;
        }
    };
}

export default new AuthService();