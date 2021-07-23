const express = require('express')
const Users = require('../models/users')
const router = new express.Router()


router.post('/users', async (req, res)=>{
    const newUser = new Users(req.body);
    
    try{
        await newUser.save()
        res.status(201).send(newUser)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get('/users',async (req, res)=>{
    try{
        const users = await Users.find({})
        res.send(users)
    }
    catch(error){
        res.status(500).send(error)
    }
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
    const update = req.body

    const updates = Object.keys(update)
    
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const user = await Users.findByIdAndUpdate(_id,  update, {new: true, runValidators: true})
        if (!user){
            return res.status(404).send()
        }
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