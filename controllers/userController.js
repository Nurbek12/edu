import User from "../models/User.js"
import Contract from "../models/Contract.js"
import { Types } from "mongoose"
import { createAction } from './actionController.js'
import bcrypt from 'bcryptjs'

import { studentPdf } from '../config/pdfInfo.js'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { v4 as uuid } from 'uuid'

import pdfMake from "pdfmake/build/pdfmake.js";
import pdfFonts from "pdfmake/build/vfs_fonts.js";
import { JSDOM } from "jsdom";
import htmlToPdfMake from "html-to-pdfmake";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { window } = new JSDOM("")

const dirname = fileURLToPath(new URL('.', import.meta.url));

export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student", ...req.query })
            .select("name birthdate phone login group role status reason start_year")
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
            .select("name birthdate phone login group role status start_year"),
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
            .select("name birthdate phone accessgroup accesssubjects login group role")
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getAllInspectors = async (req, res) => {
    try {
        const students = await User.find({ role: { $in: ['inspector', 'dean', 'accountant', 'admin', 'director'] } })
            .select("name phone login role")
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

        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(req.body.password, salt)
        const result = await User.create({...req.body, password})

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

        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        const result = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).select('-password')
        res.status(200).json(result)
        if(result.status === 'chetlashtirilgan') createAction(`Hodim ${req.user?.name}, ${result.name} ni talabalar safidan chiqardi`)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(true)
        // logger.info(`${req.user?.name} - ${user.name} ning malumotlarini bazadan ochirdi: ${new Date().toISOString()}`)
        createAction(`Hodim ${req.user?.name}, ${user.name} ning malumotlarini bazadan o'chirdi`)
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
        await Contract.create(req.body)
        .then(p => p.populate('student', 'name'))
        .then(result => {
            res.status(200).json(result)
            createAction(`Hodim ${req.user?.name}, ${result.student?.name} ning kontragiga ${result.amount} so'm pul qo'shdi`)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

//
export const downloadPdfInformation = async (req, res) => {
    try {
        const html = htmlToPdfMake(studentPdf(req.user), { window });
        const fileName = `file-${uuid()}.pdf`
        const file = path.join(dirname, '../', 'protected', fileName);
        const docDefinition = { 
            content: [ html ],
              styles: {
                "html-img": {
                    width: "100%"
                },
                "html-container": {
                  margin: [0, 0, 0, 0],
                  fontSize: 20,
                },
                "html-h1": {
                  alignment: "center",
                  fontSize: 24,
                  margin: [0, 20, 0, 0],
                },
                "html-table": {
                  width: "100%",
                  layout: {
                    hLineWidth: () => 1,
                    vLineWidth: () => 1,
                    hLineColor: () => "black",
                    vLineColor: () => "black",
                  },
                },
                "html-th": {
                  fillColor: "#dddddd",
                  fontSize: 12,
                  bold: true,
                  alignment: "center",
                  margin: [0, 4, 0, 4],
                },
                "html-td": {
                  fontSize: 12,
                  margin: [0, 4, 0, 4],
                },
              },
        };
        
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        pdfDocGenerator.getBuffer(async (buffer) => {
            // res.setHeader("Content-Type", "application/pdf");
            // res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
            fs.writeFile(file, buffer, (err) => {
                if(err) return
                res.sendFile(file);

                setTimeout(() => fs.rmSync(file, { force: true }), 10000);
            })

            // Delete the file after a timeout of 10 seconds
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const getForRePossible = async (req, res) => {
    try {
        const result = await User.aggregate([
            {
                $match: {
                    group: new Types.ObjectId(req.params.group)
                }
            },
            {
                $lookup: {
                    from: 'results',
                    foreignField: 'student',
                    localField: '_id',
                    as: 'rates',
                    pipeline: [{
                        $match: { 
                            status: 'finish',
                            midterm: new Types.ObjectId(req.params.test),
                            createdAt: req.distance 
                        }
                    }, {
                        $project: {
                            rate: 1,
                            questions: { $size: "$questions" },
                            start_time: 1,
                            end_time: 1,
                        }
                    }]
                }
            },
            {
                $project: {
                    name: 1,
                    rates: { $arrayElemAt: ["$rates", 0] },
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}