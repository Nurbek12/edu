import { Router } from 'express'
import { create, getAll, getById, update, delet, deleteFile } from '../controllers/homeworkController.js'
import { auth } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

export default Router()
    .get('/', auth, getAll)
    .get('/id/:id', auth, getById)
    .post('/', auth, upload.array('files', 10), create)
    .put('/edit/:id', auth, upload.array('files', 10), update)
    .put('/removefile/:id', auth, deleteFile)
    .delete('/:id', auth, delet)