import { useReducer } from 'react'
import './App.css'

const initialState = {
  name: "",
  password: ""
}

function reducer(state, action) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload }
    case "password":
      return { ...state, password: action.payload }
    case "reset":
      return initialState
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Form data: Name - ${state.name}, Password - ${state.password}`)
    dispatch({ type: "reset" })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name" 
            value={state.name} 
            onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={state.password} 
            onChange={(e) => dispatch({ type: "password", payload: e.target.value })}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <div>
        <h3>Current Form State:</h3>
        <p>Name: {state.name}</p>
        <p>Password: {state.password}</p>
      </div>
    </div>
  )
}

export default App
