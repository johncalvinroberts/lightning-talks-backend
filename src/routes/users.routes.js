import UsersController from '../controllers/users.controller'

export default function initUsersRoutes (server) {
  server.route('/api/users/:id')
    .get(UsersController.getUser)
}
