const model = require('../config')

const getData = async(req,res)=>{
    try{
        const data = await model.find()
        if(!data) return res.status(404).json({msg: "Data not found"})
        else return res.status(201).json(data)
    }
    catch(e){
        return res.status(501).send({e})
    }
}
const addTask = async(req,res)=>{
    try{
        const {text, completed} = req.body
        const data = new model({text,completed})
        const result = await data.save()

        if(result) res.send("Task added succesfully")
        else res.status(500).send("can't add task")
    }
    catch(e){
        return res.status(501).send({e})
    }
}
const completeTask = async(req,res)=>{
    try{
        const {taskId} = req.body
        const task = await model.findById(taskId)
        let bool = task.completed

        if(task){
            task.completed = !bool
            const updated = await task.save()
            if(updated) res.status(201).send("task updated")
        }
        else{
            return res.status(501).send("can't update task")
        }
    }
    catch(e){
        return res.status(501).send({e})
    }
}
const updateTask = async(req,res)=>{
    try{
        const {taskId, text} = req.body
        const task = await model.findById(taskId)

        if(task){
            task.text = text
            const updated = await task.save()
            if(updated) res.status(201).send("task updated")
        }
        else{
            return res.status(501).send("can't update task")
        }
    }
    catch(e){
        return res.status(501).send({e})
    }
}
const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params
        const data = await model.findByIdAndDelete(id)
        if(data) res.send(data)
        else res.status(500).send("can't delete task")
    }
    catch(e){
        return res.status(501).send({e})
    }
}

module.exports = {
    getData,
    addTask,
    completeTask,
    updateTask,
    deleteTask
}