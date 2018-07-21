import User from '../models/user'
import passport from 'passport'
import jwt from 'jsonwebtoken'
// import { generateToken, respond } from '../middleware/authMiddleware'

const AuthController = {
  async register (req, res) {
    try {
      User.register(new User({
        username: req.body.username
      }), req.body.password, function (err, account) {
        if (err) {
          return res.status(500).send('An error occurred: ' + err)
        }

        passport.authenticate(
          'local', {
            session: false
          })(req, res, () => {
          res.status(200).send('Successfully created new account')
        })
      })
    } catch (err) {
      return res.status(500).send('An error occurred: ' + err)
    }
  },
  async login (req, res, next) {
    try {
      if (!req.body.username || !req.body.password) {
        return res.status(400).json({
          message: 'Something is not right with your input'
        })
      }
      passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: 'Unauthorized',
            user: user
          })
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err)
          }
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign({ id: user.id, username: user.username }, 'ILovePokemon')
          return res.json({ user: user.username, token })
        })
      })(req, res)
    } catch (err) {
      console.log(err)
    }
  },
  async logout (req, res) {
    req.logout()
    res.status(200).send('Successfully logged out')
  },
  async profile (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      res.send('No user Returned')
    }
  }
}

export default AuthController
