const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/TodoList')

const listSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('List',listSchema)