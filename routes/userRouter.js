import { Router } from "express"
import { getAllStudents, createUser, getForPage, getAllTeachers, downloadPdfInformation, getForRePossible,
    deleteUser, updateUser, getAllInspectors, addContract, studentContract } from '../controllers/userController.js'
import { auth } from "../middlewares/authMiddleware.js"

export default Router()
    .get('/student', auth, getAllStudents)
    .get('/student/page', auth, getForPage)
    .get('/student/repossible/:group/:test', auth, getForRePossible)
    .get('/contract/:id', auth, studentContract)

    .get('/teacher', auth, getAllTeachers)
    .get('/download-info', auth, downloadPdfInformation)

    .get('/inspector', auth, getAllInspectors)

    .post('/', auth, createUser)
    .post('/contract', auth, addContract)

    .put('/:id', auth, updateUser)

    .delete('/:id', auth, deleteUser)