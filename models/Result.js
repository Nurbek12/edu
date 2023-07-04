import { model, Schema }  from 'mongoose'

export default model('results', new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    test: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: 'exams'
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String
    },
    status: {
        type: String,
        enum: ['start', 'process', 'finish']
    },
    rate: {
        type: Number,
    },
    questions: []
}))