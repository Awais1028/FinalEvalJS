const TODO = require('../../todo.model');

const addTodo = async (todoReceived)=>{
    const newtodo = new TODO (todoReceived)
    await newtodo.save()
    return newtodo
}
const updateTodoDescription = async(id, description)=>{
    await TODO.findByIdAndUpdate(id, {$set:{todoDescription:description}})
}
const updateTodoStatus = async(id, completedStatus)=>{
    await TODO.findByIdAndUpdate(id, {$set:{completed:completedStatus}})
}
const deleteTodo = async(req, res)=>{
    console.log("in deletion at backend: id is :",req.body._id)
    await TODO.findByIdAndDelete(req.body._id)
    res.send("Deletion Done!")
}
const getTodos = async ()=>{
    const todos = await TODO.find()
    return todos;
}
const getAllTodos = async (req,res)=>{
    res.send(await getTodos());
}
const postATodo = async(req,res)=>{
    const newTodo = await addTodo(req.body)
    console.log('In Post: Object Received: ', newTodo)
    res.send(newTodo)
}
const updateATodo = async (req,res)=>{
    console.log("whole Obj: ", req.body)
    await updateTodoDescription(req.body._id,req.body.todoDescription)
    await updateTodoStatus  (req.body._id,req.body.completed)
    console.log('post done')
    res.send({message:`Done!!!`})
}

module.exports = {
    getAllTodos,
    updateATodo,
    postATodo,
    deleteTodo
};