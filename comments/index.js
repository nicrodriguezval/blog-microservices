import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'

const commentsByPostId = {}

const EVENTS = {
  COMMENT_CREATED: 'CommentCreated',
  COMMENT_UPDATED: 'CommentUpdated',
  COMMENT_MODERATED: 'CommentModerated'
}

const STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

const app = express()

app.use(json())
app.use(cors())

app.get('/posts/:id/comments', (req, res) => {
  const { id: postId } = req.params

  res.send(commentsByPostId[postId] ?? [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const { id: postId } = req.params
  const { content } = req.body

  const comments = commentsByPostId[postId] ?? []
  const comment = { id: randomUUID(), content, status: STATUSES.PENDING }

  comments.push(comment)
  commentsByPostId[postId] = comments

  await sendEvent({
    type: EVENTS.COMMENT_CREATED,
    data: { ...comment, postId }
  }).catch(({ message }) => res.status(500).send({ error: message }))

  res.status(201).send(comments)
})

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === EVENTS.COMMENT_MODERATED) {
    const { postId, id, status } = data

    const comments = commentsByPostId[postId]
    const comment = comments.find((comment) => comment.id === id)

    comment.status = status

    await sendEvent({
      type: EVENTS.COMMENT_UPDATED,
      data: { ...comment, postId }
    }).catch(({ message }) => res.status(500).send({ error: message }))
  }

  res.end()
})

function sendEvent({ type, data }) {
  return fetch('http://localhost:4005/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, data })
  })
}

const PORT = process.env.PORT ?? 4001

app.listen(PORT, () => console.log('Server running on port ', PORT))
