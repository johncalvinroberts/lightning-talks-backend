import AuthService from '../services/auth.service'

const AuthController = {
  async register ({body: {username, password}}, res, next) {
    try {
      await AuthService.createUser({username, password})
      res.json({success: true})
    } catch (error) {
      next(error)
    }
  },
  async login ({ body: { username, password } }, res, next) {
    try {
      const response = await AuthService.generateToken({username, password})
      res.json(response)
    } catch (error) {
      next(error)
    }
  },
  profile (req, res) {
    try {
      res.send(req.user)
    } catch (err) {
      res.send('No user Returned')
    }
  }
}

export default AuthController
