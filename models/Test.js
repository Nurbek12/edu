import { model, Schema } from "mongoose"

export default model('tests', new Schema({
    name: {
        type: String,
        required: true
    },
    science: {
        type: String,
        required: true
    }
}))

export const Midterm = model('midterms', new Schema({
    name: {
        type: String,
        required: true
    },
    groups: [{
        type: Schema.Types.ObjectId,
        ref: 'groups'
    }],
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    count: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    }
}))

export const Question = model('questions', new Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    midterm: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    text: {
        type: String,
        required: true
    },
    image: String,
    variants: [{
        image: String,
        text: String, 
        value: Number
    }],
}))