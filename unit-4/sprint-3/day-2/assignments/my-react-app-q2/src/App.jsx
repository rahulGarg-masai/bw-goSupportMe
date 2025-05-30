import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://jsonplaceholder.typicode.com/todos')
        if (!response.ok) {
          throw new Error('Failed to fetch todos')
        }
        const data = await response.json()
        setTodos(data)
        setTotalPages(Math.ceil(data.length / itemsPerPage))
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={currentPage === i ? 'active' : ''}
        >
          {i}
        </button>
      )
    }
    return pageNumbers
  }

  const getCurrentTodos = () => {
    const indexOfLastTodo = currentPage * itemsPerPage
    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage
    return todos.slice(indexOfFirstTodo, indexOfLastTodo)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="app-container">
      <h1>Todo List</h1>
      <div className="todos-container">
        {getCurrentTodos().map(todo => (
          <div key={todo.id} className="todo-item">
            <span className="todo-id">{todo.id}</span>
            <span className="todo-title">{todo.title}</span>
            <span className="todo-status">
              {todo.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={handlePrevious} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button 
          onClick={handleNext} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App
