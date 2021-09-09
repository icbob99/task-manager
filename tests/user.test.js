const { TestWatcher } = require('jest')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const app = require('./../src/app')
const User = require('../src/models/users')
const { use } = require('./../src/app')

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
        token: jwt.sign({_id: userOneId}, process.env.SECRETCODE)
    }]
}


beforeEach(async () => {
    await User.deleteMany();
    await new User(userMike).save();
})

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send(userBoris)
        .expect(201)
    //Assert that the database was changed correctly
    // console.log(`${JSON.stringify(response,null,' ')}`)
    const user = await User.findById(response.body.newUser._id)
    expect(user).not.toBeNull()

    //Assertions about the response
    expect(response.body.newUser.name).toBe('Boris')
    expect(response.body).toMatchObject({
        newUser: {
            name: 'Boris',
            email: 'boris@someadr.com'            
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')

})

test('Should login existed user', async () => {
   const response = await request(app)
        .post('/users/login')
        .send({
            email: userMike.email,
            password: userMike.password
        })
        .expect(200)
    
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token) 

})

test('Should not login nonexisted user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userBoris.email,
            password: userBoris.password
        })
        .expect(400)
})

test('Should get profile of the user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userMike.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile for unauthecated user', async () => {
    await request(app)
        .get('/users/me')        
        .send()
        .expect(401)
})

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userMike.tokens[0].token}`)
        .send()
        .expect(200)
    
    const user = await User.findById(userOneId);
    // console.log(`${JSON.stringify(user, null, ' ')}`)
    // console.log(user)
    expect(user).toBeNull();
})

test('Should not delete account for unauthecated user', async () => {
    await request(app)
        .delete('/users/me')        
        .send()
        .expect(401)
})