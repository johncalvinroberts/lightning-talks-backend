import VoteService from '../services/vote.service'

const VotesController = {
  async upvote ({user, params: { slug }}, res, next) {
    try {
      await VoteService.createFromSlug(slug, user)
      res.json({success: true})
    } catch (error) {
      next(error)
    }
  },
  async removeUpvote ({ user, params: { slug } }, res, next) {
    try {
      await VoteService.removeBySlug(slug, user)
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export default VotesController
