import AuthController from '../controllers/auth.controller'
import { authenticate } from '../middleware/authMiddleware'

export default function initAuthRoutes (server) {
  server.route('/auth/register')
    .post(AuthController.register)

  server.route('/auth/login')
    .post(AuthController.login)

  server.route('/auth/profile')
    .get(authenticate, AuthController.profile)
}
