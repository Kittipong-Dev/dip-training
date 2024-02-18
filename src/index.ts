import express, { urlencoded, json } from 'express'
import config from './config'
import { dbConnect } from './database'
import { Country } from './models/Country'

async function main(): Promise<void> {
  const app = express()
  const port = config.app.port
  const host = config.app.host
  
  await dbConnect()
  await Country.sync()

  const store = {
      x: 0
  }
  const data = [
    {
      img: "https://statusneo.com/wp-content/uploads/2023/02/MicrosoftTeams-image551ad57e01403f080a9df51975ac40b6efba82553c323a742b42b1c71c1e45f1.jpg",
      title: "1"
    },
    {
      img: "https://miro.medium.com/v2/resize:fit:1400/1*YMJDp-kqus7i-ktWtksNjg.jpeg",
      title: "2"
    },
    {
      img: "https://static.vecteezy.com/system/header_search_link/thumbnail/34/hsl_large_term-bg-1__1_.jpg",
      title: "3"
    }
  ]
  
  
  app.use(express.static('public'))
  app.use(json())
  app.use(urlencoded({ extended: true}))


  app.get('/api/count', (req, res) => {
    res.json(store)
    store.x +=  1
  })
  
  app.get("/api/data", (req, res) => {
    res.json(data)
  })

  app.get("/countries", async (req, res) => {
    res.json(await Country.findAll())
  })

  app.post("/countries", async (req, res) => {
    const country = await Country.create({
      name: req.body.name,
      capital: req.body.capital,
    })
    res.json(country)
  })
  
  app.get("/welcome", (req, res) => {
    res.send("Hello world")
  });
  
  app.delete('/country/:id', async (req, res) => {
    const country = await Country.destroy({
      where: {
        id: req.params.id,
      }
    })
    res.json(country)
  })

  app.listen(port, () => {
    console.log(`Server is running on http://${host}:${port}`)
  })

}
main()