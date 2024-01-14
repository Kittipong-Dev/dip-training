import express from 'express'
const app = express()
const port = 3000

const store = {
    x: 0
}

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.json(store)
  store.x +=  1
})

app.get("/welcome", (req, res) => {
  res.send("Hello world")
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
