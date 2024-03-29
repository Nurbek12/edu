import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { create, getAll, deleteTest, getById, deleteResult, getByGroup,
    start, getTest, finishTest, updateVarint, download, getResults,
createQuestion, deleteQuestion, updateQuestion, updateTest, addAccessToTest } from '../controllers/testController.js'

export default Router()
    .get('/', auth, getAll)
    
    .get('/access/:group/:exam', auth, getByGroup)
    .post('/access', auth, addAccessToTest)
    
    .get('/id/:id', auth, getById)
    .get('/get/:id', auth, getTest)
    .get('/download', auth, download)
    .get('/result/', auth, getResults)
    .delete('/result/:id', auth, deleteResult)

    .post('/start/:id', auth, start)
    .put('/finish/:id', auth, finishTest)
    .put('/upd/:id/:n/:v', auth, updateVarint)
    
    .post('/', auth, create)
    .put('/:id', auth, updateTest)
    .delete('/:id', auth, deleteTest)

    .post('/question', auth, createQuestion)
    .put('/question/:id', auth, updateQuestion)
    .delete('/question/:id', auth, deleteQuestion)