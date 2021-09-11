const express = require('express')
const Users = require('../models/users')
const auth = require('../middleware/auth')
const multer = require('multer')
const User = require('../models/users')
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')

const router = new express.Router()


router.post('/users', async (req, res)=>{
    const newUser = new Users(req.body);
    
    try{
        await newUser.save()
        // sendWelcomeEmail('icbob99@gmail.com', 'Boris')
        const token = await newUser.generateAuthToken()
        res.status(201).send({newUser, token})
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.post('/users/login', async (req, res)=>{
    try{
        const user = await Users.findByCredentials(req.body.email, req.body.password)       
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })

        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens=[]

        await req.user.save()

        res.send()
    }catch(e){
        res.status(500).send()
    }
})

const upload = multer({
    // dest: 'avatars', 
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb){
        if (file.originalname.match(/\.(jpg|png|jpeg)$/))
            return cb(undefined, true)
        
        cb(new Error('Please upload an image.'))
        // cb(undefined, false)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{    
    const buffer = await sharp(req.file.buffer).resize({width: 4000, height: 4000}).png().toBuffer()
    
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req, res, next)=>{
    res.status(400).send({
        "error": error.message
    })
})

router.get('/users/me', auth, async (req, res)=>{
 
    res.send(req.user)
})

// router.get('/users/:id',async (req, res)=>{
//     const _id = req.params.id
//     try{
//         const user = await Users.findById(_id)
//         if (!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(error){
//         res.status(500).send(error.message)
//     }
// })

router.patch('/users/me', auth, async (req, res)=>{
    // const _id = req.user._id
    const newValues = req.body

    const updates = Object.keys(newValues)
        
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        //const user = await Users.findById(_id)
        const user = req.user

        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()

        // const user = await Users.findByIdAndUpdate(_id,  update, {new: true, runValidators: true})
        if (!user){
            return res.status(404).send()
        }
        
        res.send(user)
    }catch(error){
        res.status(400).send(error.message)
    }
})

router.delete('/users/me', auth, async (req, res)=>{
    try{
        await req.user.remove()
        // sendCancelEmail('icbob99@gmail.com','Boris')
        res.send(req.user)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

router.delete('/users/me/avatar', auth, async (reg, res)=>{
    reg.user.avatar=undefined
    await reg.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res)=>{
    try{        
        const user =  await User.findById(req.params.id)
        
        if (!user || !user.avatar){        
            throw new Error()
        }

        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send(e.message)
    }
})

module.exports = router