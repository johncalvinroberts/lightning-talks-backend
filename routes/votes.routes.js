import VotesController from '../controllers/votes.controller'
import { authenticate } from '../middleware/authMiddleware'

export default function initVotesRoutes (server) {
  server.route('/api/posts/:slug/upvote')
    .post(authenticate, VotesController.upvote)
    .delete(authenticate, VotesController.removeUpvote)
}
