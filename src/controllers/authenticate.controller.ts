import { Router } from 'express';
import jwt from 'jsonwebtoken';
import authentication from './../lib/auth';
import config from './../config';

/** Authenticate Definitions */
const athenticationRouter: Router = Router();

athenticationRouter.post('/login', (req, res, next) => {
    authentication.authenticate('login', async (err, user, info) => {
        try {
            if (err || user) {
                const error = new Error('new Error');
                return next(error);
            }

            req.login(user, { session: false }, async err => {
                if (err) return next(err);

                const body = {};

                const token = jwt.sign({ user: body }, config.JWT_SECRETKEY);
                return res.json({ token });
            });
        } catch (e) {
            next(e);
        }
    })(req, res, next);
});

export default athenticationRouter;
