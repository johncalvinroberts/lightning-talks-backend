import express from 'express'
import bodyParser from 'body-parser'
import connectToDb from './db/connect'
import postRoutes from './routes/posts.routes'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import User from './models/user'

// passport config
import passport from 'passport'
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const LocalStrategy = require('passport-local').Strategy

const server = express()
connectToDb()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({
  extended: false
}))

server.use(passport.initialize())
server.use(passport.initialize())
passport.use(new LocalStrategy({
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
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'ILovePokemon'
}, passportFindUser))

server.get('/', (req, res) => res.send('Hello World!'))
server.use('/api', postRoutes)
server.use('/auth', authRoutes)
server.use('/user', passport.authenticate('jwt', { session: false }), userRoutes)

server.listen(3005, () => {
  console.log('server started - 3005')
})
