import User from '../models/user'
import jwt from 'jsonwebtoken'

const AuthService = {
  createUser ({username, password}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!username || !password) {
          const error = new Error('Incomplete credentials')
          error.status = 400
          reject(error)
        }
        const newUser = new User({username})
        await User.register(newUser, password)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  generateToken ({username, password}) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!username || !password) throw new Error('Incomplete credentials')
        const {error, user} = await User.authenticate()(username, password)
        if (error) throw error
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET)
        resolve({ user: user.username, token })
      } catch (error) {
        if (error.name === 'IncorrectPasswordError' || error.message === 'Incomplete credentials') {
          error.status = 400
        }
        reject(error)
      }
    })
  }
}
export default AuthService
