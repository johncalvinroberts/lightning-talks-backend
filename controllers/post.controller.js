import Post from '../models/post'
import cuid from 'cuid'
import slug from 'limax'
import sanitizeHtml from 'sanitize-html'

const PostController = {
  async getAll (req, res) {
    try {
      await Post.find().sort('-dateAdded').exec((err, posts) => {
        if (err) res.status(500).send(err)
        res.json({ posts })
      })
    } catch (err) {
      res.send(err)
    }
  },
  async getPost (req, res) {
    try {
      Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
        if (err) {
          res.status(500).send(err)
        }
        res.json({ post })
      })
    } catch (err) {

    }
  },
  async addPost (req, res) {
    try {
      if (!req.body.post.title || !req.body.post.content) {
        res.status(403).end()
      }

      const newPost = new Post(req.body.post)

      // Sanitize inputs
      newPost.title = sanitizeHtml(newPost.title)
      newPost.content = sanitizeHtml(newPost.body)

      newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true })
      newPost.cuid = cuid()

      newPost.save((err, saved) => {
        if (err) {
          res.status(500).send(err)
        }
        res.json({ post: saved })
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export default PostController
