import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  total: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      state.total += action.payload.price
    },
    removeItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload)
      if (itemIndex !== -1) {
        const item = state.items[itemIndex]
        state.total -= item.price * item.quantity
        state.items.splice(itemIndex, 1)
      }
    }
  }
})

export const { addItem, removeItem } = cartSlice.actions
export default cartSlice.reducer
