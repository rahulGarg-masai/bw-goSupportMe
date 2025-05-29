import { useReducer } from 'react'

const initialState = {
  theme: 'light'
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div style={{ 
      backgroundColor: state.theme === 'light' ? '#fff' : '#333',
      color: state.theme === 'light' ? '#000' : '#fff',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1>Current Theme: {state.theme}</h1>
      <button 
        onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: state.theme === 'light' ? '#333' : '#fff',
          color: state.theme === 'light' ? '#fff' : '#333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Toggle Theme
      </button>
    </div>
  )
}

export default App
