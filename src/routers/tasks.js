const express = require('express')
const Tasks = require('../models/tasks')
const router = new express.Router()


router.post('/tasks', async (req, res)=>{
    const newTask = new Tasks(req.body)
    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(error){
        res.status(400).send(error.message)
    }
})





router.get('/tasks', async (req, res)=>{
    try{
        const tasks = await Tasks.find({})
        res.send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get('/tasks/:id',async (req, res)=>{
    const _id = req.params.id

    try{
        const tasks = await Tasks.findById(_id)
        if (!tasks) {
            return res.status(404).send()
        }
        res.send(tasks)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/tasks/:id',async (req, res)=>{
    const _id = req.params.id
    const update = req.body
    const updated = Object.keys(update)
    const allowedUpdates = ['name', 'completed']
    const isValidOperation = updated.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const tasks = await Tasks.findByIdAndUpdate(_id,  update, {new: true, runValidators: true})
        if (!tasks) {
            return res.status(404).send()
        }
        res.send(tasks)
    }catch(error){
        res.status(500).send(error.message)
    }
})



router.delete('/tasks/:id', async (req, res)=>{
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)

        if (!task){
            return res.status(404).send()
        }        

        res.send(task)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

module.exports = router