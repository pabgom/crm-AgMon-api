import { Strategy } from 'passport-local';

import { AuthenticateService } from './../../services';
import UserService from './../../services/users';

const localStrategy = () => {
    return new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (userEmail, password, done) => {
            try {
                const user = await UserService.findByEmail(userEmail);

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
