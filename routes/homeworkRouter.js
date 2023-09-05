import { Router } from 'express'
import { create, getAll, getById, getStudentHomework, update, delet, deleteFile, addFile } from '../controllers/homeworkController.js'
import { auth } from '../middlewares/authMiddleware.js'
import { upload } from '../middlewares/uploadMiddleware.js'

export default Router()
    .get('/', auth, getAll)
    .get('/id/:id', auth, getById)
    .get('/studenttasks/:id', auth, getStudentHomework)
    .post('/', auth, upload.array('files', 10), create)
    .put('/edit/:id', auth, upload.array('files', 10), update)
    .put('/addfile/:id', auth, upload.single('file'), addFile)
    .put('/removefile/:id', auth, deleteFile)
    .delete('/:id', auth, delet)