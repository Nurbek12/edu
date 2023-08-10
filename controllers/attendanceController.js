import Attendance, { Explicable } from "../models/Attendance.js"
import User from '../models/User.js'
import { createAction } from './actionController.js'
import { Types } from "mongoose"

export const getAll = async (req, res) => {
    try {
        const result = await Attendance.find({...req.query, createdAt: req.distance})
            .populate('student', 'name')
            .populate('group', 'name')
            .populate('teacher', 'name')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getByGroup = async (req, res) => {
    try {
        const today = new Date();
        const dateParts = [
            today.getFullYear().toString().substring(0),
            (today.getMonth() + 1).toString().padStart(2, '0'),
            today.getDate().toString().padStart(2, '0'),
        ];
        const dateString = dateParts.join('-');

        const result = await User.aggregate([
            {
                $match: { group: new Types.ObjectId(req.params.id), role: 'student', status: 'aktiv' }
            },
            {
                $lookup: {
                    from: 'attendences',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'attendence',
                    pipeline: [{
                        $match: { date: dateString, subject: req.query.subject }
                    }]
                }
            },
            {
                $project: {
                    name: 1,
                    att: {
                        $cond: {
                          if: { $eq: [ { $size: "$attendence" }, 0 ] },
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

export const getByUser = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $match: { group: new Types.ObjectId(req.params.id), role: 'student', status: 'aktiv', }
            },
            {
                $lookup: {
                    from: 'attendences',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'attendences',
                    pipeline: [
                        {
                            $match: { createdAt: req.distance }
                        },
                        {
                            $lookup: {
                                from: 'users',
                                foreignField: '_id',
                                localField: 'teacher',
                                as: 'teacher'
                            }
                        }, {
                            $project: {
                                teacher: { $arrayElemAt: ["$teacher.name", 0] },
                                subject: 1,
                                date: 1,
                                time: 1,
                                status: 1,
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    name: 1,
                    attendences: 1,
                }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const create = async (req, res) => {
    try {
        await Attendance.create(req.body)
            .then(result => res.status(200).json(result))
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}


export const getExps = async (req, res) => {
    try {
        const result = await Explicable.find({...req.query, createdAt: req.distance })
            .populate('student', 'name')
            .populate('group', 'name')
            .populate('inspector', 'name')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const createExp = async (req, res) => {
    try {
        await Attendance.updateMany({ 
            $and: [
                { student: req.body.student },
                { date: { $gt: req.body.start_date, $lt: req.body.end_date } },
            ]
        }, { $set: { status: true } })
        await Explicable.create({...req.body, file: req.file.filename})
            .then(p => p.populate([
                { path: 'student', select: ['name'] },
                { path: 'inspector', select: ['name'] },
                { path: 'group', select: ['name'] },
            ]))
            .then(result => {
                res.status(200).json(result)
                createAction(`Hodim ${result.inspector?.name}, ${result.student?.name} ning ${req.body.start_date} dan ${req.body.end_date} gacha NB larini sababli qildi`)
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}