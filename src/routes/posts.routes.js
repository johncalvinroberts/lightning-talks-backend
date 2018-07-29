import PostsController from '../controllers/posts.controller'
import { authenticate } from '../middleware/authMiddleware'

export default function initPostRoutes (server) {
  server.route('/api/posts')
    .get(PostsController.getAll)
    .post(authenticate, PostsController.addPost)

  server.route('/api/posts/:slug')
    .get(PostsController.getPost)
}
