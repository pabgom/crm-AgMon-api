import { Strategy, ExtractJwt } from 'passport-jwt';
import { ApiError } from '../../error/api-error';
import UserService from '../../services/users';
import config from './../../config';

const jwtStrategy = () => {
    return new Strategy(
        {
            secretOrKey: config.JWT_SECRET_KEY,
            // Change to Bearer
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
            try {
                if (!token.user.id) {
                    throw new ApiError(404, { message: 'User not found.' });
                }

                // Check if the user is active
                const user = await UserService.findOne(token.user.id);
                if (!user) {
                    throw new ApiError(404, { message: 'User not found.' });
                }

                return done(null, token.user);
            } catch (error) {
                return done(error);
            }
        }
    );
};

export default jwtStrategy;
