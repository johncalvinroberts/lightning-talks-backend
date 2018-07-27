import Vote from '../models/vote'

const VoteService = {
  createFromPostId (id, user) {
    return new Promise(async (resolve, reject) => {
      try {
        await Vote.findOrCreate({ _post: id, _user: user._id })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  removeByPostId (id, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const upvote = await Vote.findOne({_post: id, _user: user._id})
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
