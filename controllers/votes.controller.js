import VoteService from '../services/vote.service'

const VotesController = {
  async upvote ({user, params: { id }}, res, next) {
    try {
      await VoteService.createFromPostId(id, user)
      res.json({success: true})
    } catch (error) {
      next(error)
    }
  },
  async removeUpvote ({ user, params: { id } }, res, next) {
    try {
      await VoteService.removeByPostId(id, user)
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  }
}

export default VotesController
