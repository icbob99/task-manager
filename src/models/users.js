const mongoose = require('mongoose')
//const isEmail = require('validator').isEmail
const {isEmail} = require('validator')



const User = mongoose.model('User',{
    name: {
        type: String,
        trim:true,
        required: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        lowercase:true,
        validate:{
            validator: (value)=>{
                return isEmail(value)
            },

            message: props => `${props.value} is not valid email`
        }
    },
    age: {
        type: Number, 
        min:0,
        validate(v){
            if (v<0)
                throw new Error('Age must be positive value')
        }
    }, password:{
        type: String,
        required: true,
        trim: true,
        validate:{
            validator: (v)=>{
                return v.length >= 6
            },
            message: props=>`${props.value} should have size more than 6`
        }
    }

})

module.exports = User