import { Router } from 'express'
import AuthController from '../controllers/auth.controller'

const router = new Router()

router.post('/register', (req, res) => {
  AuthController.register(req, res)
})

router.post('/login', (req, res, next) => {
  AuthController.login(req, res, next)
})

router.get('/profile', (req, res) => {
  AuthController.profile(req, res)
})

export default router
