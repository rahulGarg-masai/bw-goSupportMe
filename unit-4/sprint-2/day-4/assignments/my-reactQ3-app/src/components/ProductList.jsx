import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
        
        const uniqueCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = [...products];
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (sortOrder === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOrder, products]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading products...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Product List</h1>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '1rem', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '8px',
        marginBottom: '1rem'
      }}>
        <div>
          <label style={{ marginRight: '0.5rem' }}>Filter by Category: </label>
          <select 
            value={selectedCategory} 
            onChange={handleCategoryChange}
            style={{ padding: '0.5rem' }}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label style={{ marginRight: '0.5rem' }}>Sort by Price: </label>
          <select 
            value={sortOrder} 
            onChange={handleSortChange}
            style={{ padding: '0.5rem' }}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <img 
              src={product.thumbnail} 
              alt={product.title}
              style={{ 
                width: '100%', 
                height: '150px', 
                objectFit: 'cover', 
                borderRadius: '4px',
                marginBottom: '0.5rem'
              }}
            />
            <h3 style={{ margin: '0.5rem 0' }}>{product.title}</h3>
            <p style={{ margin: '0.5rem 0' }}>
              <strong>Price:</strong> ${product.price}
            </p>
            <p style={{ margin: '0.5rem 0', textTransform: 'capitalize' }}>
              <strong>Category:</strong> {product.category}
            </p>
            <div style={{ marginTop: 'auto' }}>
              <Link 
                to={`/product/${product.id}`} 
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#3f51b5',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  marginTop: '0.5rem'
                }}
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
};
