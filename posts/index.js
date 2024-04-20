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

  try {
    await fetch('http://event-bus-srv:4005/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: EVENTS.POST_CREATED,
        data: post
      })
    }).catch((e) => console.log(e))

    res.status(201).send(post)
  } catch (e) {
    res.status(500).send({ error: e.message })
  }
})

app.post('/events', (req, res) => {
  console.log('Received event:', req.body.type)

  res.end()
})

const PORT = process.env.PORT ?? 4000

app.listen(PORT, () => console.log('Server started on port: ', PORT))
