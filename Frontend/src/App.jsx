import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './contexts/Todocontext'
import Todoform from './components/Todoform'
import TodoItem from './components/TodoItem'

function App() {

  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) =>
      prevTodo.id === id ? todo : prevTodo
    ))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((each) => each.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ?
      { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <>
      <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
        <div className='bg-gradient-to-br from-[#172842] via-[#1a2a4a] to-[#0f1419] min-h-screen py-8'>
          <div className='w-full max-w-3xl mx-auto shadow-2xl rounded-2xl px-6 py-6 text-white bg-opacity-90 backdrop-blur-sm border border-gray-700'>
            <h1 className='text-3xl font-extrabold text-center mb-10 mt-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              🚀 Manage Your Todos
            </h1>
            <div className='mb-6'>
              {/* Todo form goes here */}
              <Todoform />
            </div>
            <div className='flex flex-col gap-y-4'>
              {/* Loop and Add Todoitem here */}
              {todos.length === 0 ? (
                <div className='text-center text-gray-400 py-8'>
                  <p className='text-lg'>No todos yet. Add one above! 📝</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div key={todo.id} className='w-full transform transition-all duration-300 hover:scale-105'>
                    <TodoItem todo={todo} />
                  </div>
                ))
              )}
            </div>
            <footer className='text-center text-gray-500 text-sm mt-8'>
              Built with ❤️ using React & Tailwind CSS
            </footer>
          </div>
        </div>
      </TodoProvider>
    </>
  )
}

export default App
