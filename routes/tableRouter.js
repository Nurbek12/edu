import { Router } from 'express'
import { auth } from '../middlewares/authMiddleware.js'
import { creteTable, deleteTable, editTable, getAll, getTableByGroup } from '../controllers/tableController.js'

export default Router()
    .get('/', auth, getAll)
    .get('/my', auth, getTableByGroup)
    .post('/', auth, creteTable)
    .put('/:id', auth, editTable)
    .delete('/:id', auth, deleteTable)