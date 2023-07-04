import { Router } from "express"
import { creteGroup, deleteGroup, editGroup, getAllGroups, getAllGroupById,
creteScience, deleteScience, editScience, getAllScience} from '../controllers/gsController.js'
import { auth } from "../middlewares/authMiddleware.js"

export const groupRouter = Router()
    .get('/', auth, getAllGroups)
    // .get('/id/:id', auth, getAllGroupById)
    .post('/', auth, creteGroup)
    .put('/:id', auth, editGroup)
    .delete('/:id', auth, deleteGroup)
    
export const scienceRouter = Router()
    .get('/', auth, getAllScience)
    .post('/', auth, creteScience)
    .put('/:id', auth, editScience)
    .delete('/:id', auth, deleteScience)