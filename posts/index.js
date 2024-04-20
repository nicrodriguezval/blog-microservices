import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'

const posts = []

const EVENTS = {
  POST_CREATED: 'PostCreated',
  POST_updated: 'PostUpdated'
}

const app = express()

app.use(json())
app.use(cors())

app.get('/posts', (_, res) => {
  res.send(posts)
})

app.post('/posts', async (req, res) => {
  const { title } = req.body

  const post = { id: randomUUID(), title }

  posts.push(post)

  await fetch('http://localhost:4005/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: EVENTS.POST_CREATED,
      data: post
    })
  }).catch(({ message }) => res.status(400).send({ error: message }))

  res.status(201).send(post)
})

app.post('/events', (req, res) => {
  console.log('Received event:', req.body.type)

  res.end()
})

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => console.log('Server started on port: ', PORT))
