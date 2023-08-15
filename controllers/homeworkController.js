import { Types } from "mongoose";
import Homework, { StudentHomework } from "../models/Homework.js"

export const getAll = async (req, res) => {
    try {
        let result;
        if(req.user?.role === 'teacher') {
            result = await Homework.find({ teacher: req.user?._id, createdAt: req.distance }).sort({ _id: -1 })
        }else if(req.user?.role === 'student') {
            result = await Homework
                .aggregate([
                    {
                        $match: { groups: { $in: [ new Types.ObjectId(req.user?.group) ] } ,createdAt: req.distance }
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
                        $lookup: {
                            from: 'student-homeworks',
                            foreignField: 'homework',
                            localField: '_id',
                            as: 'student_homeworks',
                            pipeline: [{
                                $match: { student: new Types.ObjectId(req.user?._id) }
                            }]
                        }
                    },
                    {
                        $project: {
                            teacher: { $arrayElemAt: ["$teacher.name", 0] },
                            name: 1,
                            description: 1,
                            subject: 1,
                            date: 1,
                            files: 1,
                            student_homeworks: { $arrayElemAt: ["$student_homeworks", 0] },
                        }
                    },
                    {
                        $sort: { _id: -1 }
                    }
                ])
        }
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getById = async (req, res) => {
    try {
        const result = await Homework.aggregate([
            {
                $match: { _id: new Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'student-homeworks',
                    foreignField: 'homework',
                    localField: '_id',
                    as: "studentHomeworks",
                    pipeline: [{
                        $lookup: {
                            from: 'users',
                            foreignField: '_id',
                            localField: 'student',
                            as: "student"
                        }
                    },{
                        $lookup: {
                            from: 'groups',
                            foreignField: '_id',
                            localField: 'group',
                            as: "group"
                        }
                    },{
                        $project: {
                            date: 1,
                            files: 1,
                            group: { $arrayElemAt: ["$group.name", 0] },
                            homework: 1,
                            rate: 1,
                            rate_description: 1,
                            description: 1,
                            student: { $arrayElemAt: ["$student.name", 0] },
                        }
                    }]
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
        const files = req.files.map(({filename}) => filename)
        const Model = req.user?.role === 'teacher' ? Homework : StudentHomework;
        const result = await Model.create({...req.body, files})
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const update = async (req, res) => {
    try {
        const editPattern = { $set: req.body }
        
        if(req.files) {
            const files = req.files.map(({filename}) => filename)
            Object.assign(editPattern, { $push: {files} })
        }
        
        const Model = req.query.student || req.user?.role === 'student' ? StudentHomework : Homework;
        const result = await Model.findByIdAndUpdate(req.params.id, editPattern, { new: true });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const addFile = async (req, res) => {
    try{
        const result = await Homework.findByIdAndUpdate(req.params.id, { $push: { files: req.file.filename } }, { new: true })
        res.status(200).json(result.files[result.files.length - 1])
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteFile = async (req, res) => {
    try {
        const Model = req.user?.role === 'teacher' ? Homework : StudentHomework;

        await Model.findByIdAndUpdate(req.params.id, { $pull: { files: req.body.file } });
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const delet = async (req, res) => {
    try {
        await Homework.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}