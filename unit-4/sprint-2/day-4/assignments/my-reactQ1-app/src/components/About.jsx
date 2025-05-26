export const About = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>About This Blog</h1>
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        This is a simple blog application built with React and React Router. It allows users to browse through a list of blog posts, search for specific posts by title, and view the details of each post.
      </p>
      <h2 style={{ marginTop: '1.5rem' }}>Features</h2>
      <ul style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        <li>Fetch and display blog posts from an external API</li>
        <li>Filter posts by title with case-insensitive search</li>
        <li>View detailed information about each post</li>
        <li>Display tags associated with each post</li>
        <li>Responsive navigation between pages</li>
      </ul>
      <h2 style={{ marginTop: '1.5rem' }}>Technologies Used</h2>
      <ul style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
        <li>React</li>
        <li>React Router</li>
        <li>Fetch API</li>
        <li>DummyJSON for mock data</li>
      </ul>
    </div>
  );
};
