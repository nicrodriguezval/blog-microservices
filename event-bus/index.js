import express, { json } from 'express'

const events = []

const app = express()

app.use(json())

app.post('/events', (req, res) => {
  const { body: event } = req
  const ports = [4000, 4001, 4002, 4003]

  events.push(event)

  try {
    for (const port of ports) {
      fetch(`http://localhost:${port}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch((e) => console.log(e))
    }

    res.send({ status: 'OK' })
  } catch (e) {
    res.status(500).send({ error: e })
  }
})

app.get('/events', (_, res) => res.send(events))

const PORT = process.env.PORT ?? 4005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
