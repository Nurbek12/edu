import { model, Schema }  from 'mongoose'

export default model('actions', new Schema({
    title: {
        type: String
    },
    date: {
        type: String
    }
}, {
    timestamps: true
}))