import express, { json } from 'express'

const EVENTS = {
  COMMENT_CREATED: 'CommentCreated',
  COMMENT_MODERATED: 'CommentModerated'
}

const STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
}

const app = express()

app.use(json())

app.post('/events', async (req, res) => {
  const { type, data } = req.body

  if (type === EVENTS.COMMENT_CREATED) {
    const status = data.content.includes('orange')
      ? STATUSES.REJECTED
      : STATUSES.APPROVED

    fetch('http://localhost:4005/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: EVENTS.COMMENT_MODERATED,
        data: { ...data, status }
      })
    }).catch(({ message }) => res.status(500).send({ error: message }))
  }

  res.end()
})

const PORT = process.env.PORT || 4003

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
