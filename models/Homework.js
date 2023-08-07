import { model, Schema }  from 'mongoose'

export default model('homeworks', new Schema({
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'groups'
    }],
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    files: [{
        type: String,
    }]
}, {
    timestamps: true
}))

export const StudentHomework = model('student-homeworks', new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    homework: {
        type: Schema.Types.ObjectId,
        ref: 'homeworks'
    },
    subject: {
        type: String
    },
    rate: {
        type: Number
    },
    description: {
        type: String
    },
    rate_description: {
        type: String
    },
    date: {
        type: String,
    },
    files: [{
        type: String,
    }]
}, {
    timestamps: true
}))