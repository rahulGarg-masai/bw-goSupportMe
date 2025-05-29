import { useReducer } from 'react'
import './App.css'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="counter-app">
      <h1>Counter: {state.count}</h1>
      <div className="buttons">
        <button 
          onClick={() => dispatch({ type: 'INCREMENT' })}
          className="increment-btn"
        >
          Increment
        </button>
        <button 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          className="decrement-btn"
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default App
