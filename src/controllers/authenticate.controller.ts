import { Router } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

import authentication, { hasCredentials, isAuthenticated } from './../lib/auth';
import config, { Roles } from './../config';
import validateDto from '../middleware/validate-dto';
import { AuthSchema } from '../schema';

/** Authenticate Definitions */
const authenticationRouter: Router = Router();

// Limit the number of call to the POST login.
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 2, // limit each IP to 10 requests per windowMs,
    message: { message: 'Too many login attempts. Try again in a minute' }
});

authenticationRouter.post('/login', limiter, validateDto(AuthSchema), (req, res, next) => {
    authentication.authenticate('login', async (err, user, info) => {
        try {
            if (err) {
                const error = new Error('new Error');
                return next(error);
            }

            req.login(user, { session: false }, async err => {
                if (err) return next(err);

                const body = { id: user.id, username: user.name, roles: user.roles };

                const token = jwt.sign({ user: body }, config.JWT_SECRET_KEY, { algorithm: 'HS256' });
                return res.json({ token });
            });
        } catch (e) {
            next(e);
        }
    })(req, res, next);
});

authenticationRouter.get('/profile', isAuthenticated(), hasCredentials([Roles.Basic, Roles.Admin]), (req, res, next) => {
    res.json({
        message: 'Work',
        user: req.user
    });
});

export default authenticationRouter;
