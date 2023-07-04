import { Router } from 'express'
import { upload } from '../middlewares/uploadMiddleware.js'
import { crete, getAll, getMy, delet, edit } from '../controllers/resourceController.js'

export default Router()
    .get('/', getAll)
    
    .get('/:id', getMy)

    .post('/', upload.array('files'), crete)

    .put('/:id', edit)

    .delete('/:id', delet)