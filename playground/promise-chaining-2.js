require('../src/db/mongoose')
const Task = require('../src/models/tasks')

Task.findByIdAndDelete('5c1a63e8f0d4c50656c5ab28').then((task) => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})


const deleteAndCount = async (id, completed)=>{
    const user = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed})
    return count
}

deleteAndCount('60f7dfaf3bf67e34bcdb49e9', true). then((count)=>{
    console.log(count)
}).catch((e)=>{
    console.log(e.message)
})