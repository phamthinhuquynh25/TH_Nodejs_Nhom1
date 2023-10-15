import dotenv from "dotenv"
import express from "express"
import configViewEngine from "./configs/viewEngine.js"
import initWebRouter from "./route/webRoute.js"
import bodyParser from "body-parser"
import RedisStore from "connect-redis"
import session from "express-session"
import { createClient } from "redis"

const app = express()
dotenv.config()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
configViewEngine(app)
app.use(express.static('./src/public'))

// Initialize client.
let redisClient = createClient()
redisClient.connect().catch(console.error)
// Initialize store.
let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
})
// Initialize sesssion storage.
app.use(
    session({
        store: redisStore,
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data 
        exists: true,
        secret: "keyboard cat",
    })
)


initWebRouter(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})