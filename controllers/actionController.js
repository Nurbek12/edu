import Action from "../models/Action.js"

export const getAll = async (req, res) => {
    try {
        const date = req.query.date ? new Date(req.query.date) : new Date();
        const result = await Action.find({ createdAt: { 
                $gte: date.setHours(0, 0, 0, 0), 
                $lte: date.setHours(23, 59, 59, 999) 
            } 
        })
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' })
    }
}

export const createAction = async title => await Action.create({ title })
