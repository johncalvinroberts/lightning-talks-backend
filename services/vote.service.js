import Vote from '../models/vote'
import Post from '../models/post'

const VoteService = {
  createFromSlug (slug, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await Post.findOne({ slug })
        await Vote.findOrCreate({ _post: post._id, _user: user._id })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  removeBySlug (slug, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await Post.findOne({ slug })
        const upvote = await Vote.findOne({_post: post._id, _user: user._id})
        await upvote.remove()
        resolve()
      } catch (error) {
        console.log(error)
        reject(error)
      }
    })
  }
}

export default VoteService
