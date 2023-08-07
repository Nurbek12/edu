import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { getRateStudent, downloadByGroup } from '../controllers/rateController.js'

export default Router()
    .get('/student/:id', auth, getRateStudent)
    .get('/download/:id', auth, downloadByGroup)