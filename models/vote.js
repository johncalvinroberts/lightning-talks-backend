import mongoose from 'mongoose'
import findOrCreate from 'mongoose-findorcreate'
import User from './user'
import Post from './post'
const Schema = mongoose.Schema

const voteSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  _post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true }
})

voteSchema.pre('save', async function (next) {
  try {
    await User.update({ _id: this._user }, { $push: { upvotes: this._post } })
    await Post.update({ _id: this._post }, { $push: { upvotes: this._id } })
    next()
  } catch (error) {
    next(error)
  }
})

voteSchema.post('remove', async function (next) {
  try {
    await User.update({ _id: this._user }, { $pull: { upvotes: this._post } })
    await Post.update({ _id: this._post }, { $pull: { upvotes: this._id } })
  } catch (error) {
    next(error)
  }
})
const Vote = mongoose.plugin(findOrCreate).model('Vote', voteSchema)
export default Vote
