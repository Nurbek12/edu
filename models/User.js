import { Schema, model } from 'mongoose'

export default model('users', new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    birthdate: {
        type: String
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin', 'sa', 'inspector', 'dean', 'accountant'],
        default: 'student'
    },
    accessgroup: [{
        type: Schema.Types.ObjectId,
        ref: 'groups'
    }],
    
    status: {
        type: String,
        enum: ['aktiv', 'chetlashtirilgan'],
        default: 'aktiv'
    },
    reason: {
        type: String
    }
}))