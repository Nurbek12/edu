import Resource from '../models/Resource.js'
import { Types } from 'mongoose'

export const getAll = async (req, res) => {
    try{
        const result = await Resource.find()
            .populate('teacher', 'name')
            .populate('group', 'name')
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getMy = async (req, res) => {
    try{
        const result = await Resource.aggregate([
            { $match: { group: new Types.ObjectId(req.params.id) } },
            {
                $lookup: {
                    from: 'homework',
                    foreignField: '_id',
                    localField: 'resource',
                    as: 'homeworks'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'teacher',
                    as: 'teacher'
                }
            },
            {
                $project: {
                    files: 1,
                    group: 1,
                    homeworks: { $size: "$homeworks" },
                    name: 1,
                    subject: 1,
                    teacher: { $arrayElemAt: ["$teacher.name", 0] },
                }
            }
        ])
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const crete = async (req, res) => {
    try{
        const files = req.files.map(({filename}) => filename)
        await Resource.create({...req.body, files})
            .then(p => p
                .populate([
                    { path: 'teacher', select: ['name'] },
                    { path: 'group', select: ['name'] },
                ]))
            .then(result => res.status(200).json(result))
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const edit = async (req, res) => {
    try{
        const result = await Resource.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            .populate('teacher', 'name')
            .populate('group', 'name')
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const delet = async (req, res) => {
    try{
        await Resource.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
} 