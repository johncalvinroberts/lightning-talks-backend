import PostService from '../services/post.service'

const PostController = {
  async getAll ({ query: { page = 1 } }, res, next) {
    try {
      const response = await PostService.getPaginatedPosts(page)
      res.json(response)
    } catch (error) {
      next(error)
    }
  },
  async getPost ({params: {slug}}, res, next) {
    try {
      const response = await PostService.getPostBySlug(slug)
      res.json(response)
    } catch (error) {
      next(error)
    }
  },
  async addPost ({body: { post }}, res, next) {
    try {
      const response = await PostService.createPost(post)
      res.json(response)
    } catch (error) {
      next(error)
    }
  }
}

export default PostController
