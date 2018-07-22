# Lightning Talks Backend

Simple express server

## API

* Protected routes require authorization header,   `Authorization: Bearer [token]`

### authentication
  * *POST* `/auth/register`
      - ```{username, password}```
  * *POST* `/auth/login`
      - ```{username, password}```
      - returns `token`
  * *GET* `/auth/profile`
    - protected
    - returns user object of current user

#### posts
  * *GET* `/api/posts`
    - returns paginated list of lightning talks
  * *GET* `/api/posts/:slug`
    - returns detail of a single lightning talk
  * *POST* `/api/posts`
    - ```{ title, content }```
    - protected
    - Create a lighning talk

### votes
  * *POST* `/api/posts/:slug/upvote`
    - protected
    - upvote a lightning talk
  * *DELETE* `/api/posts/:slug/upvote`
    - protected
    - remove an upvote for a lightning talk
