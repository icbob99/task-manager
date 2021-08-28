const { TestWatcher } = require('jest')
const request = require('supertest')
const app = require('./../src/app')


test('Should signup a new user', async () => {
        await request(app).
            post('/users').
            send({
                name: 'Boris3',
                email: 'Boris3@someadr.com',
                password: 'MyPass777!'
            }).
            expect(201)
})