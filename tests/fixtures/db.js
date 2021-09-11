const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/users')
const Task = require('../../src/models/tasks')

const userBoris = {
    name: 'Boris',
    email: 'Boris@someadr.com',
    password: 'MyPass777!'
}

const userOneId = new mongoose.Types.ObjectId()
const userMike = {
    _id: userOneId,
    name: 'Mike',
    email: 'Mike@someadr.com',
    password: '1960!Maik',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.SECRETCODE)
    }]
}


const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.SECRETCODE)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    name: 'First task',
    completed: false,
    owner: userMike._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Second task',
    completed: true,
    owner: userMike._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDataBase = async () => {
    await Task.deleteMany();
    await User.deleteMany();
    await new User(userMike).save();
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()

}

module.exports = {
    userOneId,
    userMike,
    userBoris,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDataBase
}