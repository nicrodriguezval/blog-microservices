import express, { json } from 'express'
import cors from 'cors'

const posts = []

const EVENTS = {
  POST_CREATED: 'PostCreated',
  COMMENT_CREATED: 'CommentCreated',
  COMMENT_UPDATED: 'CommentUpdated'
}

const handleEvent = (type, data) => {
  if (type === EVENTS.POST_CREATED) {
    const { id, title } = data

    posts.push({ id, title, comments: [] })
  } else if (type === EVENTS.COMMENT_CREATED) {
    const { id, content, status, postId } = data
    const updatedPost = posts.find((post) => post.id === postId)

    updatedPost?.comments.push({ id, content, status })
  } else if (type === EVENTS.COMMENT_UPDATED) {
    const { id, content, status, postId } = data
    const updatedPost = posts.find((post) => post.id === postId)
    const updatedComment = updatedPost?.comments.find(
      (comment) => comment.id === id
    )

    updatedComment.content = content
    updatedComment.status = status
  }
}

const app = express()

app.use(cors())
app.use(json())

app.get('/posts', (_, res) => {
  res.send(posts)
})

app.post('/events', (req, res) => {
  handleEvent(req.body.type, req.body.data)
  res.end()
})

const PORT = process.env.PORT ?? 4002

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`)

  const res = await fetch('http://localhost:4005/events')
  const events = await res.json()

  events.forEach((event) => {
    console.log('Processing event:', event.type)
    handleEvent(event.type, event.data)
  })
})
