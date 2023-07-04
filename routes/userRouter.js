import { Router } from "express"
import { getAllStudents, createUser, getAllTeachers, deleteUser, updateUser, getAllInspectors, } from '../controllers/userController.js'
import { auth } from "../middlewares/authMiddleware.js"

export default Router()
    .get('/student', auth, getAllStudents)

    .get('/teacher', auth, getAllTeachers)

    // .get('/admin')

    .get('/inspector', getAllInspectors)

    .post('/', createUser)

    .put('/:id', auth, updateUser)

    .delete('/:id', auth, deleteUser)