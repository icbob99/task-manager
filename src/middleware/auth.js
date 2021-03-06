const jwt = require('jsonwebtoken')
const User = require('../models/users')


const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.SECRETCODE)
        const user = await User.findOne({_id: decoded._id, 'tokens.token':token})
        if(!user){
            throw new Error()
        }

        //store already fetched user on request for use in a next function(s) it means to reduce amount db calls        
        req.user = user
        req.token = token
        next()
    }catch(e){
        res.status(401).send({"error":"Please authenticate."})
    }
}

module.exports = auth