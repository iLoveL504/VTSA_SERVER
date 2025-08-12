import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { logDate } from './middleware/logEvents.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import { router as employeeRouter } from './routes/api/employees.js'
import { router as authRouter } from './routes/auth.js'
import { router as projectRouter } from './routes/api/projects.js'  

const app = express()
    
const URL = 4000

app.use(cors(corsOptions))
app.use(express.json())
app.use(logDate)

app.use(
    (req, res) => {
        console.log(process.env)
    }
)

app.put('/', (req, res) => {
    console.log('User login')
    res.end()
}) 
app.delete('/', (req, res) => {
    console.log('User delete')
    res.end()
}) 

app.use('/employees', employeeRouter)
app.use('/auth', authRouter)
app.use('/projects', projectRouter)

app.listen(URL, console.log(`Server running on port ${URL}`))