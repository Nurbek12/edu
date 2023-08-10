import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { create, getAll, deleteTest, getById, getTestForGroup,
    start, getTest,
    getResultByUser, download, getResults, updateTest } from '../controllers/midtermController.js'

export default Router()
    .get('/', auth, getAll)
    .get('/id/:id', auth, getById)
    .get('/my', auth, getTestForGroup)

    .get('/get/:id', auth, getTest)
    .get('/download', auth, download)

    .get('/result/', auth, getResults)
    .get('/result/user/:id', auth, getResultByUser)

    .post('/start/:id', auth, start)
    
    .post('/', auth, create)
    .put('/:id', auth, updateTest)
    .delete('/:id', auth, deleteTest)