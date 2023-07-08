import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { create, getAll, deleteTest, getById, getTestForGroup, deleteResult,
    start, getTest, finishTest, updateVarint, 
    getResultByUser, download, getResults, updateTest } from '../controllers/midtermController.js'

export default Router()
    .get('/', auth, getAll)
    .get('/id/:id', auth, getById)
    .get('/my', auth, getTestForGroup)

    .get('/get/:id', auth, getTest)
    .get('/download', auth, download)

    .get('/result/', auth, getResults)
    .get('/result/user/:id', auth, getResultByUser)
    .delete('/result/:id', auth, deleteResult)

    .post('/start/:id', auth, start)
    .put('/finish/:id', auth, finishTest)
    .put('/upd/:id/:n/:v', auth, updateVarint)
    
    .post('/', auth, create)
    .put('/:id', auth, updateTest)
    .delete('/:id', auth, deleteTest)