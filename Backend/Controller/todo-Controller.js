const todoModel = require('../model/todoModel');

exports.getAllTodos = async(req, res) => {
    const AllTodoTask = await todoModel.find();
    
    res.status(201).json({
        message: "All Todo Task",
        data: AllTodoTask,
        success: true
    });
}

exports.AddNewTodo = async(req, res) => {
    const {data} = req.body;
    
    if(!data || Object.keys(data).length === 0){
        res.status(401).json({
            message: "There's no data present",
            success: false
        });
    }

    await todoModel.create(data);

    const AllTodoTask = await todoModel.find();

    res.status(201).json({
        message: "Todo Task Created Successfully",
        data: AllTodoTask,
        success: true
    });
    
}

exports.UpdateTodoById = async(req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const todoTask = await todoModel.findOneAndUpdate(
        {_id: id},
        data,
        {new: true}
    )

    if(!todoTask){
        res.status(401).json({
            message: `Todo Task not found for the ID: ${id}`,
            success: false
        });
    }

    res.status(201).json({
        message: "Updated Successfully",
        data: todoTask,
        success: true
    });
}

exports.DeleteTodoById = async(req, res) => {
    const {id} = req.params;
    const todoTask = await todoModel.findByIdAndDelete(id);

    if(!todoTask){
        res.status(401).json({
            message: `Todo Task not found for the ID: ${id}`,
            success: false
        });
    }

    res.status(201).json({
        message: "Deleted Successfully",
        data: todoTask,
        success: true
    });
}