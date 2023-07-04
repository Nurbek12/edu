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
    files: [{
        type: String,
    }]
}))

// resources
// files
// homeworks
// tasks