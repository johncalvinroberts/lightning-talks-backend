import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'
import User from './user'
const Schema = mongoose.Schema

const postSchema = new Schema({
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  slug: { type: String, slug: ['title'], unique: true },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
})

postSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  try {
    await User.update({ _id: this._user }, {$push: { posts: this._id }})
    next()
  } catch (error) {
    next(error)
  }
})

postSchema.index('slug')

postSchema.set('toJSON', {
  transform: (doc, {title, content, slug, dateAdded, upvotes, _user, _id}, options) => {
    return {
      title,
      content,
      slug,
      dateAdded,
      upvotes: upvotes.length,
      _user,
      _id
    }
  }
})

const Post = mongoose.plugin(slug).model('Post', postSchema)

export default Post
