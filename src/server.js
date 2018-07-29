/* eslint-disable import/first */
const prod = process.env.NODE_ENV === 'production'
if (!prod) {
  require('dotenv').config()
}
import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import connectToDb from './db/connect'
import initPostRoutes from './routes/posts.routes'
import initAuthRoutes from './routes/auth.routes'
import initVoteRoutes from './routes/votes.routes'
import initUsersRoutes from './routes/users.routes'
import { initPassport } from './middleware/authMiddleware'

const server = express()
connectToDb()
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.use(compression())
server.use(cors({
  origin: prod ? 'https://lightning.johnny.sh' : ['http://localhost:8080'],
  credentials: true
}))

server.use(initPassport())

// initialize routes
initPostRoutes(server)
initAuthRoutes(server)
initUsersRoutes(server)
initVoteRoutes(server)

// error handler, needs to be last middleware to be declared
server.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

server.listen(3005, () => {
  console.log('server started, listening on port 3005')
})
