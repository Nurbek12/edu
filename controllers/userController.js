import User from "../models/User.js"
import logger from '../config/log.js'
import Contract from "../models/Contract.js"
import { Types } from "mongoose"

export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student", ...req.query })
            .select("name birthdate phone login password group role status reason start_year")
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getForPage = async (req, res) => {
    try {
        const { page, limit, search, status } = req.query
        const skip = (page - 1) * limit
        const filter = search ? { name: { $regex: search, $options: 'i' } } : {}
        const [data, total] = await Promise.all([
            User.find({...filter, role: "student"}).skip(skip).limit(parseInt(limit)).lean()
            .select("name birthdate phone login password group role status start_year"),
            User.countDocuments({...filter, role: "student"}),
        ])
    
        res.json({ data, total })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getAllTeachers = async (req, res) => {
    try {
        const students = await User.find({ role: "teacher", ...req.query })
            .select("name birthdate phone accessgroup accesssubjects login password group role")
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getAllInspectors = async (req, res) => {
    try {
        const students = await User.find({ role: { $in: ['inspector', 'dean', 'accountant', 'admin'] } })
            .select("name phone login password role")
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const createUser = async (req, res) => {
    try{
        const checkLogin = await User.findOne({ login: req.body.login })
        if(checkLogin) return res.status(200).json(false)
        const result = await User.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const updateUser = async (req, res) => {
    try{
        const checkLogin = await User.findOne({ $and: [{ _id: { $ne: req.params.id } }, { login: req.body.login }] });
        if (checkLogin) return res.json(false)
        const result = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
        logger.info(`${req.user?.name} - ${user.name} ning malumotlarini bazadan ochirdi: ${new Date().toISOString()}`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

// conttract
export const studentContract = async (req, res) => {
    try {
        const students = await User.aggregate([
            {
                $match: { group: new Types.ObjectId(req.params.id), status: 'aktiv', role: 'student' }
            },
            {
                $lookup: {
                    from: 'contracts',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'contract',
                    pipeline: [
                        {
                            $match: { createdAt: req.distance }
                        },
                        {
                            $project: { amount: 1, date: 1 }
                        }
                    ]
                }
            },
            {
                $project: {
                    name: 1,
                    phone: 1,
                    contract: 1,
                    total: { $sum: '$contract.amount' }
                }
            }
        ])
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const addContract = async (req, res) => {
    try {
        const result = await Contract.create(req.body)
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}