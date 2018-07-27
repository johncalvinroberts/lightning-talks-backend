import UserService from '../services/user.service'

const UsersController = {
  async getUser ({ params: { id } }, res, next) {
    try {
      const response = await UserService.getUserInfo(id)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}

export default UsersController
