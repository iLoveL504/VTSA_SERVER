import express from 'express'
import { logDate } from './middleware/logEvents.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'

const app = express()

const URL = 4000

app.use(cors(corsOptions))
app.use(express.json())
app.use(logDate)

app.post('/', (req, res) => {
    console.log('User login')
    res.end()
})

app.listen(URL, console.log(`Server running on port ${URL}`))