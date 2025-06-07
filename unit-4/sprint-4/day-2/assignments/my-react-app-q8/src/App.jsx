import React from 'react';
import { useToggleItems } from './useToggleItems';

function App() {
  const [item, toggle] = useToggleItems(['A','B','C'], 1);
  return (
    <div>
      <h1>{item}</h1>
      <button onClick={toggle}>Next</button>
    </div>
  );
}

export default App;
