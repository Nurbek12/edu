import { Types } from 'mongoose'
import { Group, Science } from '../models/GS.js'
import User from '../models/User.js'

export const getAllGroups = async (req, res) => {
    try{
        const $project = { name: 1, users: { $size: "$users" } }
        if(!req.query.users) delete $project.users
        const groups = await Group.aggregate([
            { $lookup: {
                    from: 'users',
                    foreignField: 'group',
                    localField: '_id',
                    as: 'users'
            } },
            { $project }
        ])
        res.status(200).json(groups)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getForTeacher = async (req, res) => {
    try{
        const groups = await Group.find({ _id: { $in: req.user.accessgroup } })
        res.status(200).json(groups)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const creteGroup = async (req, res) => {
    try{
        const group = await Group.create(req.body)
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const editGroup = async (req, res) => {
    try{
        const group = await Group.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(group)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteGroup = async (req, res) => {
    try{
        await Group.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}



export const getAllScience = async (req, res) => {
    try{
        const result = await Science.find()
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getForTeacherSubjects = async (req, res) => {
    try{
        const subjects = await Science.find({ name: { $in: req.user.accesssubjects } })
        res.status(200).json(subjects)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getByGroupStudent = async (req, res) => {
    try{
        const result = await User.aggregate([
            {
                $match: {
                    accessgroup: { 
                        $in: [ new Types.ObjectId(req.params.id) ]
                    },
                    role: "teacher"
                },
            },
            {
                $project: {
                    _id: 0,
                    accesssubjects: 1,
                },
            },
        ])
        const subjects = new Set(result.flatMap((teacher) => teacher.accesssubjects));
        res.status(200).json(Array.from(subjects))
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const creteScience = async (req, res) => {
    try{
        const result = await Science.create(req.body)
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const editScience = async (req, res) => {
    try{
        const result = await Science.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteScience = async (req, res) => {
    try{
        await Science.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}