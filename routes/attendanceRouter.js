import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'
import { create, getAll, getByGroup, getByUser, createExp, getExps } from '../controllers/attendanceController.js'

export default Router()
    .get('/', auth, getAll)
    .get('/id/:id', auth, getByGroup)
    .get('/user/:id', auth, getByUser)

    .get('/exp', auth, getExps)
    .post('/exp', auth, upload.single('file'), createExp)
    
    .post('/', auth, create)