import Post from '../models/post'
import sanitizeHtml from 'sanitize-html'
const sortMethods = {
  newest: '-dateAdded',
  upvotes: { 'upvotes': -1 }
}

const PostService = {
  _fields: ['title', 'content', 'slug', 'dateAdded', 'upvotes'],
  getPaginatedPosts (page, sort = 'newest') {
    return new Promise(async (resolve, reject) => {
      try {
        const skipAmt = (parseInt(page) * 20) - 20
        const countPromise = Post.count()
        const postsPromise = Post.find()
          .sort(sortMethods[sort])
          .select(this._fields)
          .populate('_user', ['username'])
          .skip(skipAmt)
          .limit(20)
        const [posts, count] = await Promise.all([postsPromise, countPromise])
        resolve({ posts, count, page })
      } catch (error) {
        reject(error)
      }
    })
  },
  getPostBySlug (slug) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await Post.findOne({ slug })
          .select(this._fields)
          .populate('_user', ['username'])
        if (!post) {
          const error = new Error('Post not found')
          error.status = 404
          reject(error)
        }
        resolve(post)
      } catch (error) {
        reject(error)
      }
    })
  },
  createPost ({title, content}, user) {
    return new Promise(async (resolve, reject) => {
      try {
        const newPost = new Post({
          title: sanitizeHtml(title),
          content: sanitizeHtml(content),
          _user: user._id
        })
        const post = await newPost.save()
        resolve(post)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default PostService
