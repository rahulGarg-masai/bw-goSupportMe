import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts);
        setFilteredPosts(data.posts);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(results);
  }, [searchTerm, posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Blog Posts</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
        />
      </div>
      <div>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} style={{ 
              marginBottom: '1rem', 
              padding: '1rem', 
              border: '1px solid #ddd', 
              borderRadius: '4px' 
            }}>
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}...</p>
              <Link to={`/post/${post.id}`} style={{ 
                color: '#0066cc', 
                textDecoration: 'none', 
                fontWeight: 'bold' 
              }}>
                Read More
              </Link>
            </div>
          ))
        ) : (
          <p>No posts found matching your search.</p>
        )}
      </div>
    </div>
  );
};
