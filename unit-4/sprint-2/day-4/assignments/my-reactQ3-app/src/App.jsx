import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ProductList } from './components/ProductList'
import { ProductDetail } from './components/ProductDetail'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
