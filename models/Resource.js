import { model, Schema }  from 'mongoose'

export default model('resources', new Schema({
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
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
    room: {
        type: String,
        required: true
    },
    files: [{
        type: String,
    }]
}, {
    timestamps: true
}))

// resources
// files
// homeworks
// tasks