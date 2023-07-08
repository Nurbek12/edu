import { Router } from "express"
import { Group } from '../models/GS.js'
import User from "../models/User.js"
import Test from "../models/Test.js"
import Exam from "../models/Exam.js"
import { fileURLToPath } from 'url'
import { join } from 'path'
import { auth } from '../middlewares/authMiddleware.js'

const dirname = fileURLToPath(new URL('.', import.meta.url));

export default Router()
    .get('/info', auth, async (req, res) => {
        const students = (await User.find({ role: 'student' })).length
        const inspectors = (await User.find({ role: 'inspector' })).length
        const tests = await Test.count()
        const groups = await Group.count()

        return res.status(200).json({ students, inspectors, tests, groups })
    })
    .get('/logs', async (req, res) => res.sendFile(join(dirname, '../', 'app.log')))
    .get('/all/names', auth, async (req, res) => {
        const students = await User.find({ role: 'student' }).select('name')
        const tests = await Test.find().select('name')
        const groups = await Group.find().select('name')
        const exams = await Exam.aggregate([
            {
                $lookup: {
                    from: "tests",
                    localField: "test",
                    foreignField: "_id",
                    as: "test",
                    pipeline: [{
                        $project: {
                            name: 1
                        }
                    }]
                }
            },
            {
                $project: {
                    name: { $arrayElemAt: ["$test.name", 0] },
                    test: { $arrayElemAt: ["$test._id", 0] },
                }
            },
        ])

        return res.status(200).json({ students, tests, groups, exams })
    })