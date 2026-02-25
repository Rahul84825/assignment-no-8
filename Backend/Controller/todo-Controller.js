const todoModel = require('../model/todoModel');

exports.getAllTodos = async (req, res) => {
  try {
    const allTodoTask = await todoModel.find();

    return res.status(200).json({
      message: 'All Todo Task',
      data: allTodoTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch todo tasks',
      success: false,
    });
  }
};

exports.AddNewTodo = async (req, res) => {
  try {
    const { data } = req.body;

    if (!data || Object.keys(data).length === 0 || !data.task) {
      return res.status(400).json({
        message: "There's no valid data present",
        success: false,
      });
    }

    await todoModel.create(data);

    const allTodoTask = await todoModel.find();

    return res.status(201).json({
      message: 'Todo Task Created Successfully',
      data: allTodoTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create todo task',
      success: false,
    });
  }
};

exports.UpdateTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        message: 'No update data provided',
        success: false,
      });
    }

    const todoTask = await todoModel.findOneAndUpdate({ _id: id }, data, { new: true });

    if (!todoTask) {
      return res.status(404).json({
        message: `Todo Task not found for the ID: ${id}`,
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Updated Successfully',
      data: todoTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to update todo task',
      success: false,
    });
  }
};

exports.DeleteTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todoTask = await todoModel.findByIdAndDelete(id);

    if (!todoTask) {
      return res.status(404).json({
        message: `Todo Task not found for the ID: ${id}`,
        success: false,
      });
    }

    return res.status(200).json({
      message: 'Deleted Successfully',
      data: todoTask,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete todo task',
      success: false,
    });
  }
};

exports.searchTodos = async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Search query received:', query);

    if (!query || query.trim() === '') {
      const allTodoTask = await todoModel.find();
      return res.status(200).json({
        message: 'All Todo Task',
        data: allTodoTask,
        success: true,
      });
    }

    // Case-insensitive search for task field
    const searchResults = await todoModel.find({
      task: { $regex: query, $options: 'i' }
    });
    
    console.log('Found results:', searchResults.length);

    return res.status(200).json({
      message: 'Search Results',
      data: searchResults,
      success: true,
    });
  } catch (error) {
    console.error('Search error:', error);
    return res.status(500).json({
      message: 'Failed to search todo tasks',
      success: false,
    });
  }
};
