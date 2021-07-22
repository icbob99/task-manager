//CRUD

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId

const {MongoClient, ObjectId} = require('mongodb')

const connectionUrl = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (error, client)=>{
    if (error){
        return console.log('Unable to connect to databse!')
    }


    const db = client.db(databaseName)



    // db.collection('users').insertOne({
    //     name: 'Boris',
    //     age: 51
    // }, (error, result)=>{
    //     if (error){
    //         return console.log('Unable to insert data!')
    //     }

    //     console.log('inserted: '+ result.insertedId)
    // })

    // db.collection('users').insertMany([{
    //     name: 'Nomi',
    //     age: 19
    // },{
    //     name: 'Maya',
    //     age: 15
    // }], (error, result)=>{
    //     if (error){
    //         return console.log('Unable to insert data!')
    //     }

    //     console.log('inserted: '+ result.insertedCount)
    // })

//     db.collection('tasks').insertMany([{
//         description: 'Take Nomi',
//         completed: true
//     },{
//         description: 'Clean for Muri',
//         completed: true
//     }, {
//         description: 'Drive May',
//         completed: true
//     }], (error, result)=>{
//         if (error){
//             return console.log('Unable to insert data!')
//         }

//         console.log('inserted: '+ result.insertedCount)
//     })
    db.collection('users').findOne({name: 'Boris', age: 22},(error, user)=>{
        if(error)
        return console.log('User is not found ' + JSON.stringify(error) + ' ' + error)

        console.log('User: ' + JSON.stringify( user))
    })

    db.collection('users').findOne({_id:new ObjectId("60f1c08806c813b676cf8776")},(error, user)=>{
        if(error)
        return console.log('User is not found ' + JSON.stringify(error) + ' ' + error)

        console.log('User: ' + JSON.stringify( user))
    })

    db.collection('users').find({age:51}).toArray((error, users)=>{
        if(error) return console.log('No users')

        console.log(users)
    })

    db.collection('users').find({age:51}).count((error, count)=>{
        if(error) return console.log('No users')

        console.log(count)
        // client.close();
    })
    // client.close();

    const updatePromise = db.collection('users').updateOne({
        _id:new ObjectId("60f1c118819335637d4dd868")
    },{
        $set:{
            name: 'Mike'
        }
    }    )

    updatePromise.then((result)=>{
console.log(result)
    }).catch((error)=>{
console.log(error)
    })

    const findMike = db.collection('users').find({name:'Mike'}).toArray()

    findMike.then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

    db.collection('tasks').updateMany({completed:true},{
        $set:{
            completed:false
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
    db.collection('users').deleteOne({
        _id: new ObjectId("60f1c1b483c615811404e6ef")
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })
 })

