import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { create, getAll, getMyExams, update, deletExam, getForAccess } from '../controllers/examController.js'

export default Router()
    .get('/', auth, getAll)
    .get('/my', auth, getMyExams)
    .get('/list', auth, getForAccess)

    .post('/', auth, create)
    .put('/:id', auth, update)

    .delete('/:id', deletExam)