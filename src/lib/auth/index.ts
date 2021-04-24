import passport from 'passport';
import localStrategy from './auth.local';

passport.use('login', localStrategy());

export default passport;
