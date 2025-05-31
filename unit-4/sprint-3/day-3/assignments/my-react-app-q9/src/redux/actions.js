// Action Types
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

// Generate a simple unique ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Action Creators
export const addTodo = (title) => ({
  type: ADD_TODO,
  payload: {
    id: generateId(),
    title,
    status: false
  }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id }
});
