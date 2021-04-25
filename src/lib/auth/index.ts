import passport from 'passport';
import localStrategy from './auth.local';
import jwtStrategy from './auth.jwt';

passport.use('login', localStrategy());
passport.use(jwtStrategy());

export default passport;
