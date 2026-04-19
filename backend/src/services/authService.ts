import jwt from 'jsonwebtoken';
import User from '../models/User';
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
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "your-secret-key-change-in-prod",
            { expiresIn: "7d" },
        );
        return token;
    };
    public getUserById = async (userId: number) => {
        const user = await User.findByPk(userId);
        return user;
    };
}

export default new AuthService();




