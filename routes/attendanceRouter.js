import { Router } from 'express'
import { create, getAll, getByGroup } from '../controllers/attendanceController.js'

export default Router()
    .get('/', getAll)
    .get('/:id', getByGroup)
    
    .post('/', create)