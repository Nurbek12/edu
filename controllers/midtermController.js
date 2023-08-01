import { Question, Midterm } from "../models/Test.js"
import Result from "../models/Result.js"
import { Types } from 'mongoose'

import excel from 'exceljs'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createAction } from './actionController.js'
import { v4 as uuid } from 'uuid'
import { checkTrueVarinat, shuffleArray } from './testController.js'

const dirname = fileURLToPath(new URL('.', import.meta.url));

export const getResults = async (req, res) => {
    try {
        const result = await Result.aggregate([
            { $match: { status: 'finish', exam: null, createdAt: req.distance } },
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "student",
                    pipeline: [{
                        $lookup: {
                            from: "groups",
                            localField: "group",
                            foreignField: "_id",
                            as: "group",
                        }
                    }, {
                        $project: {
                            name: 1,
                            group: { $arrayElemAt: ["$group.name", 0] },
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: "midterms",
                    localField: "midterm",
                    foreignField: "_id",
                    as: "midterm",
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
                    midterm: { $arrayElemAt: ["$midterm", 0] },
                    start_time: 1,
                    end_time: 1,
                    rate: 1,
                    questions: { $size: "$questions" },
                }
            },
            // {
            //     $group: {
            //         _id:  "$student.group",
            //         results: { $push: "$$ROOT" }
            //     }
            // },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getResultByUser = async (req, res) => {
    try {
        const result = await Result.aggregate([
            { $match: { student: new Types.ObjectId(req.params.id), status: 'finish', createdAt: req.distance } },
            {
                $lookup: {
                    from: "users",
                    localField: "student",
                    foreignField: "_id",
                    as: "student",
                    pipeline: [{
                        $lookup: {
                            from: "groups",
                            localField: "group",
                            foreignField: "_id",
                            as: "group",
                        }
                    }, {
                        $project: {
                            name: 1,
                            group: { $arrayElemAt: ["$group", 0] },
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: "midterms",
                    localField: "midterm",
                    foreignField: "_id",
                    as: "midterm",
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
                    midterm: { $arrayElemAt: ["$midterm", 0] },
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
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const start = async (req, res) => {
    try {
        const result = await Result.findOne({ $and: [{ midterm: req.params.id }, { student: req.user?._id }] })
        if (!result) {
            const qs = await Question.aggregate([
                { $match: { midterm: new Types.ObjectId(req.params.id) } },
                { $sample: { size: parseInt(req.body.count) } },
                { $project: {
                    text: 1,
                    variants: 1
                  }}
            ])
            const questions = qs.map(q => ({ ...q, selected: '', variants: shuffleArray(q.variants) }))
            const newResult = await Result.create({ midterm: req.params.id, status: 'start', student: req.user?._id, start_time: Date.now().toString(), questions })
            res.status(200).json(newResult)
        } else {
            res.status(200).json(result)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getTest = async (req, res) => {
    try {
        const result = await Result.findById(req.params.id)
            .populate('midterm')
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
            end_time: Date.now().toString(),
        }
        if(req.query.secretcode) delete newResult.end_time 
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
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}




export const getAll = async (req, res) => {
    try {
        const $match = {}
        if(req.user?.role === 'teacher') Object.assign($match, { teacher: req.user._id })
        if(req.user?.role === 'student') Object.assign($match, { groups: {$in: [req.user.group]} })
        if(req.query.date) Object.assign($match, { date: { $gte: req.query.date } })
        const result = await Midterm.find($match)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getById = async (req, res) => {
    try {
        const result = await Midterm.aggregate([
            {
                $match: { "_id": new Types.ObjectId(`${req.params.id}`) }
            },
            {
                $lookup: {
                    from: 'questions',
                    foreignField: 'midterm',
                    localField: '_id',
                    as: 'questions'
                }
            }
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
        const test = await Midterm.create({...testdata, teacher: req.user._id})
        questions.forEach(q => q.midterm = test._id)
        const question = await Question.create(questions)
        res.status(200).json({ ...test._doc, questions: question })
        createAction(`Hodim ${req.user?.name} ${test.name} oraliq nazoratini yaratdi`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateTest = async (req, res) => {
    try {
        const test = await Midterm.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(test)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteTest = async (req, res) => {
    try {
        await Midterm.findByIdAndDelete(req.params.id)
        await Question.deleteMany({ midterm: req.params.id })
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getTestForGroup = async (req, res) => {
    try {
        const today = new Date();
        const dateParts = [
            today.getFullYear().toString().substring(0),
            (today.getMonth() + 1).toString().padStart(2, '0'),
            today.getDate().toString().padStart(2, '0'),
        ];
        const dateString = dateParts.join('-');
        // console.log(dateString);
        const result = await Midterm.aggregate([
            {
                $match: {
                    groups: { $in: [req.user?.group] },
                    date: dateString
                }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'midterm',
                    localField: '_id',
                    as: 'result',
                    pipeline: [{
                        $match: {
                            student: new Types.ObjectId(req.user?._id),
                            status: 'finish'
                        }
                    }, {
                        $project: {
                            end_time: 1,
                            rate: 1,
                            start_time: 1,
                            status: 1,
                            student: 1,
                            midterm: 1,
                        }
                    }]
                }
            },
            {
                $project: {
                    count: 1,
                    date: 1,
                    groups: 1,
                    name: 1,
                    subject: 1,
                    time: 1,
                    result: { $arrayElemAt: ["$result", 0] },
                }
            },
            {
                $sort: { _id: -1 }
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
        const { group, ...other } = req.query
        const result = await Result.find({ status: 'finish', group, createdAt: req.distance, ...other})
            .populate('midterm', 'name count')
            .populate('group', 'name')
            .populate('student', 'name')
            .select('midterm student rate')
        const workbook = new excel.Workbook()
        const worksheet = workbook.addWorksheet('Results')
        worksheet.columns = [
            { header: 'Oraliq nomi', key: 'midterm.name', width: 20 },
            { header: 'Talaba', key: 'student.name', width: 25 },
            { header: 'Guruhi', key: 'student.group', width: 15 },
            { header: "To'gri javoblar", key: 'rate', width: 15 },
            { header: "Foizi", key: 'percent', width: 15 },
        ]
        result.forEach(r => {
            worksheet.addRow({
                'rate': r.rate,
                'student.name': r.student.name || 'topilmadi',
                'midterm.name': r.midterm.name || 'topilmadi',
                'student.group': r.student.group.name || 'topilmadi',
                'percent': parseFloat(r.rate * 100 / r.midterm.count).toFixed(1)
            })
        })
        const file = path.join(dirname, '../', 'protected', `file-${uuid()}.xlsx`);
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