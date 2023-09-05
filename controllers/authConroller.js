import User from '../models/User.js'
import { secret } from '../config/keys.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const login = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login })
        
        if(!user) return res.json({ message: 'Login or Password incorrect!', success: false })
        
        const { password, ...userData } = user._doc
        const isMatch = await bcrypt.compare(req.body.password, password)

        if(!isMatch) return res.json({ message: 'Login or Password incorrect!', success: false })
        
        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '2h' })
        res.status(200).json({ token, user: userData, success: true })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server Error!' })
    }
}