import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
import User from './user'
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  slug: { type: String, slug: ['title'], unique: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' }
})

postSchema.pre('save', function (next) {
  if (!this.isNew) return next()
  try {
    User.update({ _id: this._user }, {$push: { posts: this._id }})
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

postSchema.index('slug')

const Post = mongoose.plugin(slug).model('Post', postSchema)

export default Post
