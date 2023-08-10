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
    status: {
        type: Boolean,
    },
}, {
    timestamps: true
}))

export const Explicable = model('explicables', new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    inspector: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    start_date: {
        type: String,
        required: true
    },
    end_date: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
}, {
    timestamps: true
}))