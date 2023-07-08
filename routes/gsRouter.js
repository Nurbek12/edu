import { Router } from "express"
import { creteGroup, deleteGroup, editGroup, getAllGroups, getForTeacher,
creteScience, deleteScience, editScience, getAllScience} from '../controllers/gsController.js'
import { auth } from "../middlewares/authMiddleware.js"

export const groupRouter = Router()
    .get('/', auth, getAllGroups)
    .get('/access', auth, getForTeacher)
    .post('/', auth, creteGroup)
    .put('/:id', auth, editGroup)
    .delete('/:id', auth, deleteGroup)
    
export const scienceRouter = Router()
    .get('/', auth, getAllScience)
    .post('/', auth, creteScience)
    .put('/:id', auth, editScience)
    .delete('/:id', auth, deleteScience)