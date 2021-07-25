const express = require('express')
const Users = require('../models/users')
const auth = require('../middleware/auth')

const router = new express.Router()


router.post('/users', async (req, res)=>{
    const newUser = new Users(req.body);
    
    try{
        await newUser.save()
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

router.get('/users/me', auth,async (req, res)=>{
 
    res.send(req.user)
})

router.get('/users/:id',async (req, res)=>{
    const _id = req.params.id
    try{
        const user = await Users.findById(_id)
        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/users/:id',async (req, res)=>{
    const _id = req.params.id
    const newValues = req.body

    const updates = Object.keys(newValues)
        
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const user = await Users.findById(_id)

        updates.forEach((update)=>user[update]=req.body[update])

        await user.save()

        // const user = await Users.findByIdAndUpdate(_id,  update, {new: true, runValidators: true})
        if (!user){
            return res.status(404).send()
        }
        console.log(user)
        res.send(user)
    }catch(error){
        res.status(400).send(error.message)
    }
})

router.delete('/users/:id', async (req, res)=>{
    try{
        const user = await Users.findByIdAndDelete(req.params.id)

        if (!user){
            return res.status(404).send()
        }        

        res.send(user)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

module.exports = router