import { model, Schema }  from 'mongoose'

export default model('attendences', new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
}))