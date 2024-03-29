import Test, { Question } from "../models/Test.js"
import Result from "../models/Result.js"
import User from "../models/User.js"
import { Types } from 'mongoose'
import { timerFunction } from '../config/finishTest.js'

import excel from 'exceljs'
import { join } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'
import { createAction } from './actionController.js'

const dirname = fileURLToPath(new URL('.', import.meta.url));

export function checkTrueVarinat(questions) {
    return questions.reduce((a, b) => {
        return a + (b.variants.find(v => v._id.toString() === b.selected)?.value || 0)
    }, 0)
}

export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function deleteFile(file) {
    fs.rmSync(join(dirname, '../', 'upload', file), { force: true })
}

// results
export const getResults = async (req, res) => {
    try {
        const $match = { status: 'finish', midterm: null, createdAt: req.distance }
        if (req.query.user) Object.assign($match, { student: new Types.ObjectId(req.query.user) })
        if (req.query.test) Object.assign($match, { test: new Types.ObjectId(req.query.test) })
        if (req.query.exam) Object.assign($match, { exam: new Types.ObjectId(req.query.exam) })
        if (req.query.group) Object.assign($match, { group: new Types.ObjectId(req.query.group) })
        const result = await Result.aggregate([
            { $match },
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "student",
                }
            },
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
                $lookup: {
                    from: "groups",
                    localField: "group",
                    foreignField: "_id",
                    as: "group",
                    pipeline: [{
                        $project: {
                            name: 1
                        }
                    }]
                }
            },
            {
                $project: {
                    student: { $arrayElemAt: ["$student", 0] },
                    test: { $arrayElemAt: ["$test", 0] },
                    group: { $arrayElemAt: ["$group", 0] },
                    start_time: 1,
                    end_time: 1,
                    rate: 1,
                    questions: { $size: "$questions" },
                }
            },
            {
                $sort: {
                    _id: -1
                }
            },
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const addAccessToTest = async (req, res) => {
    try {
        const newResult = await Result.create(req.body)
        res.status(200).json(newResult)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const start = async (req, res) => {
    try {
        const qs = await Question.aggregate([
            { $match: { test: new Types.ObjectId(req.params.id) } },
            { $sample: { size: req.body.count } },
            {
                $project: {
                    text: 1,
                    variants: 1
                }
            }
        ])
        const questions = qs.map(q => ({ ...q, selected: '', variants: shuffleArray(q.variants) }))
        const result = await Result.findByIdAndUpdate(req.body.result, {
            status: 'start',
            start_time: Date.now(),
            questions
        })
        timerFunction(req.body.time, result._id)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getTest = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate('exam')
            .populate('test')
            .populate('student', 'name group')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateVarint = async (req, res) => {
    try {
        await Result.findByIdAndUpdate(req.params.id, { $set: { ["questions." + req.params.n + ".selected"]: req.params.v } })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const finishTest = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
        const newResult = {
            status: 'finish',
            rate: checkTrueVarinat(result.questions),
            end_time: Date.now(),
        }
        if (req.query.secretcode) delete newResult.end_time
        await Result.findByIdAndUpdate(req.params.id, {
            $set: newResult
        })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteResult = async (req, res) => {
    try {
        await Result.findByIdAndDelete(req.params.id)
        if(req.query.writeaction) createAction(`Hodim ${req.user.name}, Talaba ${req.query.writeaction}ga '${req.query.testname}' oraliq nazoratini bajarish uchun imkoniyat berdi`)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getByGroup = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $match: { group: new Types.ObjectId(req.params.group), role: 'student', status: 'aktiv' }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'result',
                    pipeline: [{
                        $match: { exam: new Types.ObjectId(req.params.exam), createdAt: req.distance }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'contracts',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'contract',
                    pipeline: [{
                        $project: {
                            amount: 1,
                            date: 1
                        }
                    }]
                }
            },
            {
                $project: {
                    name: 1,
                    total: { $sum: '$contract.amount' },
                    att: {
                        $cond: {
                            if: { $eq: [{ $size: "$result" }, 0] },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const download = async (req, res) => {
    try {
        const result = await Result.find({ status: 'finish', midterm: null, createdAt: req.distance, ...req.query })
            .populate('group', 'name')
            .populate('test', 'name')
            .populate('student', 'name')
            .select('test student rate questions')
        const workbook = new excel.Workbook()
        const worksheet = workbook.addWorksheet('Results')
        worksheet.columns = [
            { header: 'Test nomi', key: 'test.name', width: 20 },
            { header: 'Talaba', key: 'student.name', width: 25 },
            { header: 'Guruhi', key: 'student.group', width: 15 },
            { header: "To'gri javoblar", key: 'rate', width: 15 },
            { header: "Foizi", key: 'percent', width: 15 },
        ]
        result.forEach(r => {
            worksheet.addRow({
                'rate': r.rate,
                'student.name': r.student.name || 'topilmadi',
                'test.name': r.test?.name || 'topilmadi',
                'student.group': r.group.name || 'topilmadi',
                'percent': parseFloat(r.rate * 100 / (r.questions.length||1)).toFixed(1)
            })
        })
        const file = join(dirname, '../', 'protected', `file-${uuid()}.xlsx`);
        workbook.xlsx.writeFile(file)
            .then(() => {
                res.setHeader('Content-disposition', 'attachment; filename=file.xlsx');
                res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.download(file, () => {
                    setTimeout(() => fs.rmSync(file, { force: true }), 10000)
                })
            }).catch(err => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}



// tests
export const getAll = async (req, res) => {
    try {
        const result = await Test.find()
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getById = async (req, res) => {
    try {
        const result = await Test.aggregate([
            {
                $match: { "_id": new Types.ObjectId(`${req.params.id}`) }
            },
            {
                $lookup: {
                    from: 'questions',
                    foreignField: 'test',
                    localField: '_id',
                    as: 'questions'
                }
            },
        ])
        res.status(200).json(result[0])
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const create = async (req, res) => {
    try {
        const { questions, ...testdata } = req.body
        const test = await Test.create(testdata)
        questions.forEach(q => q.test = test._id)
        const question = await Question.create(questions)
        res.status(200).json({ ...test._doc, questions: question })
        createAction(`Hodim ${req.user?.name} ${test.name} test bazasini yaratdi`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateTest = async (req, res) => {
    try {
        const test = await Test.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(test)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteTest = async (req, res) => {
    try {
        await Test.findByIdAndDelete(req.params.id)
        await Question.deleteMany({ test: req.params.id })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}


export const createQuestion = async (req, res) => {
    try {
        const result = await Question.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateQuestion = async (req, res) => {
    try {
        const result = await Question.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}