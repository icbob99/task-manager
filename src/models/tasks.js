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
    }, 
    owner:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User'

    }
})

module.exports = Tasks