import React, { useState, useCallback, useMemo, useEffect } from 'react';
import './App.css';

const Post = React.memo(({ id, title, body, verifyPost, toggleVerify, backgroundColor }) => {
  return (
    <div style={{ backgroundColor }}>
      <h2>{title}</h2>
      <p>{body}</p>
      <button onClick={() => toggleVerify(id)}>{verifyPost ? 'Verified' : 'Verify'}</button>
    </div>
  );
});

function App() {
  const [timer, setTimer] = useState(0);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addPost = () => {
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: Date.now(), title, body, verifyPost: false },
    ]);
    setTitle('');
    setBody('');
  };

  const toggleVerify = useCallback((id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, verifyPost: !post.verifyPost } : post
      )
    );
  }, []);

  const generateBackgroundColor = useMemo(() => {
    return posts.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }, [posts]);

  return (
    <div>
      <h1>Timer: {timer}</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      <input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" />
      <button onClick={addPost}>Add Post</button>
      {posts.map((post, index) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          verifyPost={post.verifyPost}
          toggleVerify={toggleVerify}
          backgroundColor={generateBackgroundColor[index]}
        />
      ))}
    </div>
  );
}

export default App;
