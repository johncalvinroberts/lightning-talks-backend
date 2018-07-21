import { Router } from 'express'
import PostController from '../controllers/post.controller'
const router = new Router()

// Get all Posts
router.get('/posts', (req, res) => {
  PostController.getAll(req, res)
})

// Get one post by cuid
router.get('/posts/:cuid', (req, res) => {
  PostController.getPost(req, res)
})

// Add a new Post
router.post('/posts', (req, res) => {
  PostController.addPost(req, res)
})

export default router