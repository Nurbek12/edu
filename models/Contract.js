import { model, Schema }  from 'mongoose'

export default model('contracts', new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    amount: {
        type: Number,
        default: 0
    },
    date: {
        type: String
    },
}))