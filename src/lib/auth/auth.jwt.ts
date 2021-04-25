import { Strategy, ExtractJwt } from 'passport-jwt';
import config from './../../config';

const jwtStrategy = () => {
    return new Strategy(
        {
            secretOrKey: config.JWT_SECRET_KEY,
            // Change to Bearer
            jwtFromRequest: ExtractJwt.fromBodyField('token')
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        }
    );
};

export default jwtStrategy;
