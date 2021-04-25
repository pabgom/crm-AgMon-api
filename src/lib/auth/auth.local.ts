import passport from 'passport';
import { Strategy } from 'passport-local';

import { AuthenticateService, UserService } from './../../services';

const localStrategy = () => {
    return new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserService.getUserByUserName(username);

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                // Validate password
                const validate = await AuthenticateService.ComparePasswords(user.password, password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong password' });
                }
                return done(null, user, { message: 'Login successful' });
            } catch (e) {
                return done(e);
            }
        }
    );
};

export default localStrategy;
