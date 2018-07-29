// passport config
import User from '../models/user'
import passport from 'passport'
import passportJWT from 'passport-jwt'
import { Strategy } from 'passport-local'
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const initPassport = () => {
  passport.use(new Strategy({
    usernameField: 'username',
    passwordField: 'password'
  }, User.authenticate()))

  const passportFindUser = (jwtPayload, cb) => {
    return User.findById(jwtPayload.id)
      .then(user => {
        return cb(null, user)
      })
      .catch(err => {
        return cb(err)
      })
  }
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())

  // authorization through JWT in header `Authorization: Bearer [token]`
  passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, passportFindUser))
  return passport.initialize()
}

const authenticate = passport.authenticate('jwt', { session: false })
export { initPassport, authenticate }
