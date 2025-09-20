
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
import http from 'http'
import { Server } from 'socket.io'

const app = express();
const server = http.createServer(app);
console.log(process.env.NODE_ENV)
// Socket.io configuration for production
const io = new Server(server, { 
  cors: {
    origin: "*",
    credentials: true
  },
  transports: ['websocket', 'polling'] // Better production compatibility
});

export { io };

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    // Broadcast to all clients
    io.emit('chat message', msg);
  });

  socket.on('join_notifications', (employeeId) => {
    console.log(`Employee ${employeeId} joined notifications room`);
    socket.join(`notifications_${employeeId}`);
  });

  socket.on('receive_messages', (msg) => {
    console.log(msg);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions))
app.use(express.json())
app.use(logDate)



app.use('/employees', employeeRouter)
app.use('/auth', authRouter)
app.use('/projects', projectRouter)
app.use('/teams', teamsRouter)
app.use('/notifications', notificationsRouter)

server.listen(PORT, console.log(`Server running on port 4000`))