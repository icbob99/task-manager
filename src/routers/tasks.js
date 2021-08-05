const express = require('express')
const Tasks = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async (req, res)=>{
    const userId = req.user._id
    const newTask = new Tasks(req.body)
    newTask.owner = userId

    /*
    *   Another way to do it:
    const newTask = new Task({... req.body, 
    owner: req.user._id })
    */

    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(error){
        res.status(400).send(error.message)
    }
})

// GET /tasks?completed=true
// Get /task/limit=10&skip=0   first 10 reuslts
// GET /task/limit=10&skip=10 get 10 after 10 pages (skip 1st 10 pages)
router.get('/tasks', auth, async (req, res)=>{
    try{
        // const tasks = await Tasks.find({owner: req.user._id})
        // res.send(tasks)
          // or 
          const match  = {}
        if(req.query.completed){
            match.completed = req.query.completed === 'true'
        }
          await req.user.populate({
              path : 'tasks',
              match,
              options: {
                  limit: parseInt(req.query.limit),
                  skip: parseInt(req.query.skip)
              }
            }).execPopulate()
          res.send(req.user.tasks)
    }catch(error){
        console.log(`I'm here ${error}`)
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id

    try{
        // const tasks = await Tasks.findById(_id)
        const tasks = await Tasks.findOne({ _id, owner: req.user._id})      

        if (!tasks) {
            return res.status(404).send()
        }
        res.send(tasks)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.patch('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id
    const updatedKeyValluePairs = req.body
    const updatedKeys = Object.keys(updatedKeyValluePairs)
    const allowedUpdates = ['name', 'completed']
    const isValidOperation = updatedKeys.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid Updates!'})
    }

    try{
        const task = await Tasks.findOne({_id, owner: req.user._id})
        
        if (!task) {
            return res.status(404).send()
        }
        updatedKeys.forEach((update)=>task[update]=updatedKeyValluePairs[update])
        await task.save()

        res.send(task)
    }catch(error){
        res.status(500).send(error.message)
    }
})



router.delete('/tasks/:id', auth, async (req, res)=>{
    try{
        const task = await Tasks.findOneAndDelete({_id: req.params.id,owner: req.user._id})

        if (!task){
            return res.status(404).send()
        }        

        res.send(task)
    }catch(e){
        return res.status(500).send(e.message)
    }
})

module.exports = router