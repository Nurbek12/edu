import { Router } from 'express'
import { upload } from '../middlewares/uploadMiddleware.js'
import { auth } from '../middlewares/authMiddleware.js'
import { crete, getAll, delet, edit, addFile, rmFile } from '../controllers/resourceController.js'

export default Router()
    .get('/', auth, getAll)

    .post('/', auth, upload.array('files'), crete)

    .put('/:id', auth, edit)

    .put('/addfile/:id', auth, upload.single('file'), addFile)
    
    .put('/rmfile/:id/:file', auth, rmFile)

    .delete('/:id', auth, delet)