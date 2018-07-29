import User from '../models/user'
import { rejects } from 'assert'

const UserServie = {
  getUserInfo (id) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await User.findById(id)
          .populate('posts')
        if (!user) {
          const error = new Error('Post not found')
          error.status = 404
          reject(error)
        }
        resolve(user)
      } catch (error) {
        rejects(error)
      }
    })
  }
}

export default UserServie
