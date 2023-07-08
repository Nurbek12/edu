import Resource from '../models/Resource.js'
import { deleteFile } from './testController.js'
import { Types } from 'mongoose'

export const getAll = async (req, res) => {
    try{
        const result = await Resource.find({...req.query}).sort({ date: 1 })
            .populate('teacher', 'name')
            .populate('group', 'name')
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

export const addFile = async (req, res) => {
    try{
        const result = await Resource.findByIdAndUpdate(req.params.id, { $push: { files: req.file.filename } }, { new: true })
        res.status(200).json(result.files[result.files.length - 1])
    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const rmFile = async (req, res) => {
    try{
        await Resource.findByIdAndUpdate(req.params.id, { $pull: { files: req.params.file } })
        res.status(200).json(true)
        deleteFile(req.params.file)
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