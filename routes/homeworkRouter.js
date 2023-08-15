import { Router } from 'express'
import { create, getAll, getById, update, delet, deleteFile, addFile } from '../controllers/homeworkController.js'
import { auth } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

export default Router()
    .get('/', auth, getAll)
    .get('/id/:id', auth, getById)
    .post('/', auth, upload.array('files', 10), create)
    .put('/edit/:id', auth, upload.array('files', 10), update)
    .put('/addfile/:id', auth, upload.single('file'), addFile)
    .put('/removefile/:id', auth, deleteFile)
    .delete('/:id', auth, delet)