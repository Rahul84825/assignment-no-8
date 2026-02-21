import { useEffect, useState } from 'react';
import './App.css';
import Todoform from './components/Todoform';
import TodoItem from './components/TodoItem';
import {
  fetchTodos,
  createTodo,
  updateTodoById,
  deleteTodoById,
} from './api/todoApi';

const normalizeTodos = (items = []) =>
  items.map((item) => ({
    id: item._id,
    todo: item.task,
    completed: Boolean(item.completed),
  }));
  

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = async (todo) => {
    const task = todo?.todo?.trim();
    if (!task) return;

    try {
      const data = await createTodo(task);
      setTodos(normalizeTodos(data));
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const updateTodo = async (id, todo) => {
    try {
      const updated = await updateTodoById(id, {
        task: todo.todo,
        completed: todo.completed,
      });

      if (!updated) return;

      setTodos((prev) =>
        prev.map((prevTodo) =>
          prevTodo.id === id
            ? {
                ...prevTodo,
                todo: updated.task,
                completed: Boolean(updated.completed),
              }
            : prevTodo
        )
      );
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoById(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    if (!currentTodo) return;

    await updateTodo(id, {
      ...currentTodo,
      completed: !currentTodo.completed,
    });
  };

  useEffect(() => {
    let isMounted = true;

    const loadTodos = async () => {
      try {
        const data = await fetchTodos();
        if (isMounted) {
          setTodos(normalizeTodos(data));
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    };

    loadTodos();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='bg-gradient-to-br from-[#172842] via-[#1a2a4a] to-[#0f1419] min-h-screen py-8'>
      <div className='w-full max-w-3xl mx-auto shadow-2xl rounded-2xl px-6 py-6 text-white bg-opacity-90 backdrop-blur-sm border border-gray-700'>
        <h1 className='text-3xl font-extrabold text-center mb-10 mt-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
          Manage Your Todos
        </h1>
        <div className='mb-6'>
          <Todoform addTodo={addTodo} />
        </div>
        <div className='flex flex-col gap-y-4'>
          {todos.length === 0 ? (
            <div className='text-center text-gray-400 py-8'>
              <p className='text-lg'>No todos yet. Add one above.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div key={todo.id} className='w-full transform transition-all duration-300 hover:scale-105'>
                <TodoItem
                  todo={todo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                  toggleComplete={toggleComplete}
                />
              </div>
            ))
          )}
        </div>
        <footer className='text-center text-gray-500 text-sm mt-8'>
          Built using React, Axios, Express, and MongoDB
        </footer>
      </div>
    </div>
  );
}

export default App;
