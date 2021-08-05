const express = require('express')

//this is only to forece require for mongo and mongoose db
require('./db/mongoose')
const Users = require('./models/users')
const Tasks = require('./models/tasks')

const app = express()
const port = process.env.PORT || 3000

const usersRouters = require('./routers/users')
const tasksRouter = require('./routers/tasks')


//use nulter exampe
const mullter = require('multer')
const upload = mullter({
    dest: 'images',
    limits: {
        fieldSize: 1000000
    },
    fileFilter(req, file, cb){
        //if(!file.originalname.endsWith('.pdf')){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Please upload a PDF'))
        }
        // cb(new Error('Please upload an image'))
         cb(undefined, true)
        // cb(undefined, false)
    }
})

// app.post('/upload', upload.single('upload'), (req, res)=>{
//     res.send()
// })

// const errorMidleware = (req, res, next)=>{
//     throw new Error('From midle ware')
// }
app.post('/upload', upload.single('upload'), (req, res)=>{
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send({"error":error.message})
})


app.use(express.json())
app.use(usersRouters)
app.use(tasksRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
