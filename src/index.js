const express = require('express')
//this is only to force require for mongo and mongoose db
require('./db/mongoose')
const Users = require('./models/users')
const Tasks = require('./models/tasks')

const app = express()
const port = process.env.PORT

const usersRouters = require('./routers/users')
const tasksRouter = require('./routers/tasks')

app.use(express.json())
app.use(usersRouters)
app.use(tasksRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
