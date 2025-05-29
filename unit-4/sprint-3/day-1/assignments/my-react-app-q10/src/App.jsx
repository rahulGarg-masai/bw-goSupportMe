import { useReducer } from 'react'
import './App.css'

const initialState = {
  collegeName: '',
  establishedYear: '',
  address: {
    street: '',
    building: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  },
  courses: [],
  showData: false
}

function reducer(state, action) {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'updateAddress':
      return {
        ...state,
        address: {
          ...state.address,
          [action.field]: action.value
        }
      }
    case 'updateCourses':
      return {
        ...state,
        courses: action.value.split(',')
      }
    case 'toggleShowData':
      return {
        ...state,
        showData: !state.showData
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch({ type: 'toggleShowData' })
  }

  return (
    <div className="App">
      <h1>College Form</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>College Name:</label>
          <input
            type="text"
            value={state.collegeName}
            onChange={(e) => dispatch({
              type: 'update',
              field: 'collegeName',
              value: e.target.value
            })}
            required
          />
        </div>
        
        <div>
          <label>Established Year:</label>
          <input
            type="number"
            value={state.establishedYear}
            onChange={(e) => dispatch({
              type: 'update',
              field: 'establishedYear',
              value: e.target.value
            })}
            required
          />
        </div>
        
        <div>
          <h3>Address</h3>
          
          <div>
            <label>Street:</label>
            <input
              type="text"
              value={state.address.street}
              onChange={(e) => dispatch({
                type: 'updateAddress',
                field: 'street',
                value: e.target.value
              })}
              required
            />
          </div>
          
          <div>
            <label>Building:</label>
            <input
              type="text"
              value={state.address.building}
              onChange={(e) => dispatch({
                type: 'updateAddress',
                field: 'building',
                value: e.target.value
              })}
              required
            />
          </div>
          
          <div>
            <label>City:</label>
            <input
              type="text"
              value={state.address.city}
              onChange={(e) => dispatch({
                type: 'updateAddress',
                field: 'city',
                value: e.target.value
              })}
              required
            />
          </div>
          
          <div>
            <label>State:</label>
            <input
              type="text"
              value={state.address.state}
              onChange={(e) => dispatch({
                type: 'updateAddress',
                field: 'state',
                value: e.target.value
              })}
              required
            />
          </div>
          
          <div>
            <label>Pincode:</label>
            <input
              type="text"
              value={state.address.pincode}
              onChange={(e) => dispatch({
                type: 'updateAddress',
                field: 'pincode',
                value: e.target.value
              })}
              required
            />
          </div>
          
          <div>
            <label>Landmark:</label>
            <input
              type="text"
              value={state.address.landmark}
              onChange={(e) => dispatch({
                type: 'updateAddress',
                field: 'landmark',
                value: e.target.value
              })}
            />
          </div>
        </div>
        
        <div>
          <label>Courses Offered (comma-separated):</label>
          <input
            type="text"
            value={state.courses.join(',')}
            onChange={(e) => dispatch({
              type: 'updateCourses',
              value: e.target.value
            })}
            required
          />
        </div>
        
        <button type="submit">Submit</button>
      </form>
      
      {state.showData && (
        <div className="display-data">
          <h2>Form Data:</h2>
          <p><strong>College Name:</strong> {state.collegeName}</p>
          <p><strong>Established Year:</strong> {state.establishedYear}</p>
          
          <h3>Address:</h3>
          <p>Street: {state.address.street}</p>
          <p>Building: {state.address.building}</p>
          <p>City: {state.address.city}</p>
          <p>State: {state.address.state}</p>
          <p>Pincode: {state.address.pincode}</p>
          <p>Landmark: {state.address.landmark}</p>
          
          <h3>Courses Offered:</h3>
          <ul>
            {state.courses.map((course, index) => (
              <li key={index}>{course.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
