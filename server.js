import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { logDate } from './middleware/logEvents.js'
import cors from 'cors'
import corsOptions from './config/corsOptions.js'
import { router as employeeRouter } from './routes/api/employees.js'
import { router as authRouter } from './routes/auth.js'
import { router as projectRouter } from './routes/api/projects.js'  
import { router as teamsRouter } from './routes/api/teams.js'
import { router as notificationsRouter } from './routes/api/notifications.js'


const app = express()
    
const URL = 4000

app.use(cors(corsOptions))
app.use(express.json())
app.use(logDate)


app.use('/test', (req,res) => {console.log(req.body)})

app.use('/employees', employeeRouter)
app.use('/auth', authRouter)
app.use('/projects', projectRouter)
app.use('/teams', teamsRouter)
app.use('/notifications', notificationsRouter)

app.listen(URL, console.log(`Server running on port ${URL}`))