import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './redux/actions'
import './App.css'

function App() {
  const count = useSelector(state => state.count)
  const dispatch = useDispatch()

  return (
    <div className="App">
      <h1>Redux Counter Application</h1>
      
      <div className="counter-container">
        <h2>Counter: {count}</h2>
        
        <div className="button-container">
          <button onClick={() => dispatch(increment())}>Increment</button>
          <button onClick={() => dispatch(decrement())}>Decrement</button>
        </div>
      </div>
      
      <div className="counter-info">
        <p>This counter is managed by Redux</p>
      </div>
    </div>
  )
}

export default App
