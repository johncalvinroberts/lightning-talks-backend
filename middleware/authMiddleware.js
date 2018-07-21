import jwt from 'jsonwebtoken'
// import expressJwt from 'express-jwt'
// let authenticate = expressJwt({ secret: SECRET })

const TOKENTIME = 60 * 60 * 24 * 30 // 30 days
const SECRET = 'ILovePokemon'

export const generateToken = (req, res, next) => {
  req.token = req.token || {}
  req.token = jwt.sign({
    id: req.user.id,
    username: req.user.username
  }, SECRET, {
    expiresIn: TOKENTIME // 30 days
  })
  next()
}

export const respond = (req, res) => {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  })
}
