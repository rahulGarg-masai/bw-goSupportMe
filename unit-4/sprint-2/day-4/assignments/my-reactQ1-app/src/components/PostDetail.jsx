import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then(response => response.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{post.title}</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>{post.body}</p>
      <div style={{ marginTop: '1rem' }}>
        <h3>Tags:</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {post.tags.map((tag, index) => (
            <span key={index} style={{ 
              background: '#eee', 
              padding: '0.25rem 0.5rem', 
              borderRadius: '4px' 
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
