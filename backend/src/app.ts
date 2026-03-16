import express, { Application } from 'express';
import cors from 'cors';
import passport from 'passport';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('Welcome to Techmart API');
});
export default app;