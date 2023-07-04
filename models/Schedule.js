import { model, Schema }  from 'mongoose'

export default model('schedule', new Schema({
    groups: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    name: String,
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    tables: [{
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        science: String,
    }]
}))