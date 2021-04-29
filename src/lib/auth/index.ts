import { RoleEntity } from './../../entity/role.entity';
import passport from 'passport';
import localStrategy from './auth.local';
import jwtStrategy from './auth.jwt';
import Logger from '../logger';

passport.use('login', localStrategy());
passport.use(jwtStrategy());

export default passport;

export function isAuthenticated() {
    return passport.authenticate('jwt', { session: false });
}

/**
 *
 * @param credentials array with the roles. if the array is empty pass the validation
 * @returns
 */
export const hasCredentials = (credentials: number[] = []) => {
    return (req, res, next) => {
        if (!credentials) {
            Logger.error("credentials don't specify");
            res.status(500).json({ message: 'internal server error' });
            return;
        }

        const roles: RoleEntity[] = req.user.roles;

        // Filter Role allowed
        const roleFilter: RoleEntity[] = roles.filter(r => credentials.find(c => c === r.id));

        // Validate if is allowed
        if (roleFilter.length === 0) {
            return res.status(403).json({ message: 'User not allowed to do this action' });
        }

        next();
    };
};
