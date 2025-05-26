import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error: {error}</h2>
        <Link to="/">Back to Products</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <Link 
        to="/" 
        style={{ 
          display: 'inline-block', 
          marginBottom: '1rem',
          color: '#3f51b5',
          textDecoration: 'none',
          fontWeight: 'bold'
        }}
      >
        ← Back to Products
      </Link>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '2rem',
        background: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div>
          <div style={{ 
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '1rem'
          }}>
            <img 
              src={product.thumbnail} 
              alt={product.title}
              style={{ 
                width: '100%', 
                height: 'auto', 
                borderRadius: '8px'
              }}
            />
            {product.discountPercentage > 0 && (
              <div style={{ 
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: '#e53935',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}>
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '0.5rem' 
          }}>
            {product.images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${product.title} ${index}`}
                style={{ 
                  width: '100%', 
                  height: '80px', 
                  objectFit: 'cover', 
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>
        
        <div>
          <h1 style={{ marginTop: 0 }}>{product.title}</h1>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>{product.description}</p>
          
          <div style={{ margin: '1.5rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3f51b5' }}>
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span style={{ color: '#888', textDecoration: 'line-through' }}>
                  ${Math.round(product.price / (1 - product.discountPercentage / 100))}
                </span>
              )}
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                color: '#ff9800',
                marginRight: '0.5rem'
              }}>
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span>{product.rating} stars</span>
            </div>
          </div>
          
          <div style={{ margin: '1rem 0' }}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', minWidth: '100px' }}>Brand:</span>
              <span>{product.brand}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', minWidth: '100px' }}>Category:</span>
              <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 'bold', minWidth: '100px' }}>Stock:</span>
              <span>{product.stock} units</span>
            </div>
          </div>
          
          <button 
            style={{ 
              padding: '0.75rem 1.5rem', 
              backgroundColor: '#3f51b5', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px', 
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
