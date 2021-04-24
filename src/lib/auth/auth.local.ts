import passport from 'passport';
import { Strategy } from 'passport-local';

import { AuthenticateService, UserService } from './../../services';

const localStrategy = () => {
    return new Strategy(
        {
            usernameField: 'email',
            passwordField: 'pasword'
        },
        async (email, password, done) => {
            try {
                const user = await UserService.getUserByEmail(email);

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                // Validate password
                const validate = await AuthenticateService.ComparePasswords(user.password, password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong password' });
                }
                return done(null, user, { message: 'Login successfull' });
            } catch (e) {
                return done(e);
            }
        }
    );
};

export default localStrategy;
