const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoDescription: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

const TODO = mongoose.model('TODO', todoSchema);

module.exports = TODO;