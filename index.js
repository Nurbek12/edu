import { fileURLToPath } from 'url'
import path, { join } from 'path'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { port } from './config/keys.js'
import database from './config/database.js'
import SocketIO from './config/socket.js'

import indexRouter from './routes/index.js'
import userRouter from './routes/userRouter.js'
import authRouter from './routes/authRouter.js'
import testRouter from './routes/testRouter.js'
import examRouter from './routes/examRouter.js'
import tableRouter from './routes/tableRouter.js'
import resourceRouter from './routes/resourceRouter.js'
import attendanceRouter from './routes/attendanceRouter.js'
import { groupRouter, scienceRouter } from './routes/gsRouter.js'

import { Server } from 'socket.io'

const dirname = fileURLToPath(new URL('.', import.meta.url));
const app = express()
const server = createServer(app)
const io = new Server(server, { cors: { credentials: true, origin: 'http://localhost:5173' } })

app
    .use(cors())
    .use(express.json({ limit: '100mb' }))
    .use(express.urlencoded({ limit: '100mb', extended: true, parameterLimit:50000 }))
    .use(express.static(path.join(dirname, 'dist')))
    
    .use(indexRouter)
    .use('/exam', examRouter)
    .use('/auth', authRouter)
    .use('/user', userRouter)
    .use('/test', testRouter)
    .use('/group', groupRouter)
    .use('/table', tableRouter)
    .use('/science', scienceRouter)
    .use('/resource', resourceRouter)

    .use('/attendence', attendanceRouter)

    .use('*', async (req, res) => res.sendFile(join(dirname, 'dist', 'index.html')))

SocketIO(io)

server.listen(port, () => {
    database()
    console.log('Server start...')
})