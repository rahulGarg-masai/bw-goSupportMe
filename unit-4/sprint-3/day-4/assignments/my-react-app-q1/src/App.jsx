import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from './store/cartSlice'
import './App.css'

const availableItems = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Headphones', price: 199 },
  { id: 4, name: 'Keyboard', price: 99 },
  { id: 5, name: 'Mouse', price: 49 }
]

function App() {
  const dispatch = useDispatch()
  const { items, total } = useSelector((state) => state.cart)

  const handleAddItem = (item) => {
    dispatch(addItem(item))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  }

  return (
    <div className="app">
      <h1>Shopping Cart</h1>
      
      <div className="available-items">
        <h2>Available Items</h2>
        <div className="items-grid">
          {availableItems.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <button onClick={() => handleAddItem(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      <div className="cart">
        <h2>Cart Items</h2>
        {items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price} x {item.quantity}</span>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
        <div className="total">
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  )
}

export default App
