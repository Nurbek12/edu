import Exam from '../models/Exam.js'
import { Types } from 'mongoose'
import { createAction } from './actionController.js'

export const getAll = async (req, res) => {
    try {
        const $match = {}
        if (req.query.date) Object.assign($match, { date: { $gte: req.query.date } })
        const result = await Exam.find($match)
            .populate('test', 'name subject')
            .sort({ _id: -1 })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getForAccess = async (req, res) => {
    try {
        const result = await Exam.aggregate([
            {
                $lookup: {
                    from: "tests",
                    localField: "test",
                    foreignField: "_id",
                    as: "test",
                    pipeline: [{
                        $project: {
                            name: 1,
                            subject: 1,
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: "groups",
                    foreignField: "_id",
                    localField: "groups",
                    as: "groups",
                    pipeline: [{
                        $project: {
                            name: 1,
                        }
                    }]
                }
            },
            {
                $project: {
                    groups: 1,
                    subject: { $arrayElemAt: ["$test.subject", 0] },
                    name: { $arrayElemAt: ["$test.name", 0] },
                    test: { $arrayElemAt: ["$test._id", 0] },
                }
            },
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const create = async (req, res) => {
    try {
        await Exam.create(req.body)
            .then(_ => _.populate('test', 'name subject'))
            .then(exam => {
                res.status(200).json(exam)
                createAction(`Hodim ${req.user?.name}, ${exam.test?.name} test bazasida imtihon yaratdi`)
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const update = async (req, res) => {
    try {
        const result = await Exam.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('test', 'name subject')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getMyExams = async (req, res) => {
    try {
        const today = new Date();
        const dateParts = [
            today.getFullYear().toString().substring(0),
            (today.getMonth() + 1).toString().padStart(2, '0'),
            today.getDate().toString().padStart(2, '0'),
        ];
        const dateString = dateParts.join('-');
        const result = await Exam.aggregate([
            {
                $match: {
                    groups: { $in: [req.user?.group] },
                    date: dateString
                }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'exam',
                    localField: '_id',
                    as: 'result',
                    pipeline: [{
                        $match: {
                            student: new Types.ObjectId(req.user?._id),
                        }
                    }, {
                        $project: {
                            end_time: 1,
                            rate: 1,
                            start_time: 1,
                            status: 1,
                            student: 1,
                            test: 1,
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'tests',
                    foreignField: '_id',
                    localField: 'test',
                    as: 'test',
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
                    test: { $arrayElemAt: ["$test", 0] },
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

export const deletExam = async (req, res) => {
    try {
        await Exam.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}