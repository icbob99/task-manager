const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
//const isEmail = require('validator').isEmail
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
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

userSchema.pre('save', async function(next){
    const user = this
    
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
        console.log(user.password)
    }

    next()
})

userSchema.statics.findByCredentials = async (email, password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }
    
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User',userSchema)

module.exports = User