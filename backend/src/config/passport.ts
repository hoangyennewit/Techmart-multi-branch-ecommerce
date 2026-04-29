import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import authService from "../services/authService";

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || 'mock_client_id',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_client_secret',
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const result = await authService.upsertGoogleUser(profile);
            return done(null, result);
        } catch (error){
            return done(error, undefined);
        }
    }
));