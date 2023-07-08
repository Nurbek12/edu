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
    midterm: {
        type: Schema.Types.ObjectId,
        ref: 'midterms'
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'groups'
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String
    },
    status: {
        type: String,
        enum: ['created', 'start', 'finish']
    },
    rate: {
        type: Number,
        default: 0
    },
    questions: []
}))