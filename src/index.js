import express from 'express'
import dotenv from 'dotenv'
import configViewEngine from './config/viewEngine'
import initWebRoute from './route/webRoute'
import path from 'path'
import bodyParser from "body-parser"
const app = express()
dotenv.config()
const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
configViewEngine(app)

app.use(express.static(path.join(__dirname, 'public')))
app.use('/bootstrap/css', express.static(path.join(__dirname, './../node_modules/bootstrap/dist/css')))
app.use('/bootstrap/js', express.static(path.join(__dirname, './../node_modules/bootstrap/dist/js')))
initWebRoute(app)
app.listen(port, () => {
  console.log(`Server on http://locahost:${port}`)
})