import { model, Schema }  from 'mongoose'

export const Homework = model('homeworks', new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    resource: {
        type: Schema.Types.ObjectId,
        ref: 'resources'
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    },
    files: [{
        type: String,
    }],
}))

export const Task = model('tasks', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    homework: {
        type: Schema.Types.ObjectId,
        ref: 'homeworks'
    },
    rate: {
        type: Number
    },
    date: {
        type: String,
        required: true
    },
    files: [{
        type: String,
    }],
}))