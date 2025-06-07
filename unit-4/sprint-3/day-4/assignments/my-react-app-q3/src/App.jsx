import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './store/counterSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.counter.value)

  return (
    <div className="app">
      <h1>Counter</h1>
      <div className="counter">
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
    </div>
  )
}

export default App
