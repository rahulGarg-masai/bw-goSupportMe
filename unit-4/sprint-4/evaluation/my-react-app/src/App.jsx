import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PokemonDetails from './pages/PokemonDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/details/:id" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
