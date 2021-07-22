const express = require('express')

//this is only to forece require for mongo and mongoose db
require('./db/mongoose')
const Users = require('./models/users')
const Tasks = require('./models/tasks')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users', (req, res)=>{
    const newUser = new Users(req.body);
    
    newUser.save().then((result)=>{
        res.status(201).send(newUser)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })

})


app.post('/tasks', (req, res)=>{
    const newTask = new Tasks(req.body)

    newTask.save().then((result)=>{
        res.status(201).send(newTask)
    }).catch((error)=>{
        res.status(400).send(error.message)
    })
})

app.get('/users', (req, res)=>{
    Users.find({}).then((users)=>{
        res.send(users)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/users/:id', (req, res)=>{
    const _id = req.params.id

    Users.findById(_id).then((user)=>{
        if (!user)
        {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((error)=>{
        res.status(500).send(error.message)
    })
})


app.get('/tasks', (req, res)=>{
    Tasks.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send(error)
    })
})

app.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id

    Tasks.findById(_id).then((tasks)=>{
        if (!tasks)
        {
            return res.status(404).send()
        }
        res.send(tasks)
    }).catch((error)=>{
        res.status(500).send(error.message)
    })
})



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
