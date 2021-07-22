require('../src/db/mongoose')
const User = require('../src/models/users')

User.findByIdAndUpdate('60f7debc4cb1c95364d89235', { age: 1 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAndCount = async (id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count
}

updateAndCount('60f7debc4cb1c95364d89235', 2). then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e.message)
})