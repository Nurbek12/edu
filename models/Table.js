import { Schema, model } from 'mongoose'

export default model('talbes', new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    subject: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true,
        // enum: ["Dushanba","Seshanba","Chorshanba","Payshanba","Juma","Shanba"]
    },
    index: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}))