import PostController from '../controllers/post.controller'
import { authenticate } from '../middleware/authMiddleware'

export default function initPostRoutes (server) {
  server.route('/api/posts')
    .get(PostController.getAll)
    .post(authenticate, PostController.addPost)

  server.route('/api/posts/:slug')
    .get(PostController.getPost)
}
