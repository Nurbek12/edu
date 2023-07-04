import Attendance from "../models/Attendance.js"
import User from '../models/User.js'
import { Types } from "mongoose"

export const getAll = async (req, res) => {
    try {
        const result = await Attendance.find(req.query)
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
                $match: { group: new Types.ObjectId(req.params.id), role: 'student' }
            },
            {
                $lookup: {
                    from: 'attendences',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'attendence',
                    pipeline: [{
                        $match: { date: dateString }
                    }]
                }
            },
            {
                $project: {
                    name: 1,
                    // attendance: { $arrayElemAt: ["$attendence", 0] },
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

export const create = async (req, res) => {
    try {
        await Attendance.create(req.body)
            .then(result => res.status(200).json(result))
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}