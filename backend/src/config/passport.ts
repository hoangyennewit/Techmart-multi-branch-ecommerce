import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import authService from "../services/authService";
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            try {
                const user = await authService.loginWithEmail(email, password);
                return done(null, user);
            } catch (error: any) {
                return done(null, false, { message: error.message });
            }
        }
    )
);