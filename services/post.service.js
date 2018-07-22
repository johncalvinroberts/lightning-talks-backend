import Post from '../models/post'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'

const PostService = {
  _fields: ['title', 'content', 'slug', 'dateAdded', 'cuid'],
  getPaginatedPosts (page) {
    return new Promise(async (resolve, reject) => {
      try {
        const skipAmt = (parseInt(page) * 10) - 10
        const countPromise = Post.count()
        const postsPromise = Post.find()
          .sort('-dateAdded')
          .select(this._fields)
          .skip(skipAmt)
          .limit(10)
        const [posts, count] = await Promise.all([postsPromise, countPromise])
        resolve({ posts, count, page })
      } catch (error) {
        reject(error)
      }
    })
  },
  async getPostBySlug (slug) {
    return new Promise(async (resolve, reject) => {
      try {
        const post = await Post.findOne({ slug }).select(this._fields)
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
  createPost ({title, content}) {
    return new Promise(async (resolve, reject) => {
      try {
        const newPost = new Post({
          title: sanitizeHtml(title),
          content: sanitizeHtml(content),
          slug: slug(title.toLowerCase(), { lowercase: true }),
          cuid: cuid()
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
