import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { create, getAll, getMyExams, update } from '../controllers/examController.js'

export default Router()
    .get('/', auth, getAll)
    .get('/my', auth, getMyExams)

    .post('/', auth, create)
    .put('/:id', auth, update)