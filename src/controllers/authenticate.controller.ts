import { Router } from 'express';
import jwt from 'jsonwebtoken';
import authentication from './../lib/auth';
import config from './../config';
import Logger from '../lib/logger';

/** Authenticate Definitions */
const authenticationRouter: Router = Router();

authenticationRouter.post('/login', (req, res, next) => {
    authentication.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                const error = new Error('new Error');
                return next(error);
            }

            req.login(user, { session: false }, async err => {
                if (err) return next(err);

                const body = { id: user.id, username: user.name };

                const token = jwt.sign({ user: body }, config.JWT_SECRET_KEY, { algorithm: 'HS256' });
                return res.json({ token });
            });
        } catch (e) {
            next(e);
        }
    })(req, res, next);
});

authenticationRouter.get('/profile', authentication.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log(' PASO Profile');
    res.json({
        message: 'Work'
    });
});

export default authenticationRouter;
