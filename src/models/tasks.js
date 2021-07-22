const mongoose = require('mongoose')

const Tasks = mongoose.model('Tasks',{
    name: {
        type: String,
        trim: true, 
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Tasks