const express = require('express')

//this is only to forece require for mongo and mongoose db
require('./db/mongoose')
const Users = require('./models/users')
const Tasks = require('./models/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', async (req, res)=>{
    const newUser = new Users(req.body);
    
    try{
        await newUser.save()
        res.status(201).send(newUser)
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

app.post('/tasks', async (req, res)=>{
    const newTask = new Tasks(req.body)
    try{
        await newTask.save()
        res.status(201).send(newTask)
    }catch(error){
        res.status(400).send(error.message)
    }
})

app.get('/users',async (req, res)=>{
    try{
        const users = await Users.find({})
        res.send(users)
    }
    catch(error){
        res.status(500).send(error)
    }
})

app.get('/users/:id',async (req, res)=>{
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


app.get('/tasks', async (req, res)=>{
    try{
        const tasks = await Tasks.find({})
        res.send(tasks)
    }catch(error){
        res.status(500).send(error)
    }
})

app.get('/tasks/:id',async (req, res)=>{
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



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
