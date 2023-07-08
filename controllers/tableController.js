import Table from "../models/Table.js"
import { Types } from 'mongoose'

export const getTableByGroup = async (req, res) => {
    try {
        const $match = {}
        if(req.query.group) Object.assign($match, { group: new Types.ObjectId(req.query.group) })
        else if(req.user.role === 'student') Object.assign($match, { group: new Types.ObjectId(req.user?.group) })
        else if(req.user.role === 'teacher') Object.assign($match, { teacher: new Types.ObjectId(req.user?._id) })
        const result = await Table.aggregate([
            {
                $match
            },
            {
                $lookup: {
                    from: 'groups',
                    localField: 'group',
                    foreignField: '_id',
                    as: 'group',
                    pipeline: [{
                        $project: {
                            name: 1,
                        }
                    }]
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'teacher',
                    foreignField: '_id',
                    as: 'teacher',
                    pipeline: [{
                        $project: {
                            name: 1,
                        }
                    }]
                }
            },
            {
                $project: {
                    subject: 1,
                    day: 1,
                    index: 1,
                    room: 1,
                    teacher: { $arrayElemAt: ["$teacher", 0] },
                    group: { $arrayElemAt: ["$group", 0] },
                }
            },
            {
                $sort: {
                    index: 1
                }
            },
            {
                $group: {
                    _id: '$day',
                    data: {
                        $push: "$$ROOT"
                    }
                }
            }
        ])
        const groupedResult = {};

        result.forEach(item => {
            groupedResult[item._id] = item.data;
        });

        res.status(200).json(groupedResult)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const creteTable = async (req, res) => {
    try {
        await Table.create(req.body)
            .then(r => r
                .populate([
                    { path: 'group', select: ['name'] },
                    { path: 'teacher', select: ['name'] },
                ]))
            .then(result => res.status(200).json(result))
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const editTable = async (req, res) => {
    try {
        const result = await Table.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('group', 'name')
            .populate('teacher', 'name')
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteTable = async (req, res) => {
    try {
        await Table.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}