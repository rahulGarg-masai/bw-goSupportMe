import { useUserContext } from '../context/UserContext';

export const Home = () => {
  const { user } = useUserContext();

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center' 
    }}>
      <h1>Welcome, {user.name}!</h1>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '2rem',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
      }}>
        <img 
          src={user.avatar} 
          alt={user.name}
          style={{ 
            width: '120px', 
            height: '120px', 
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '1rem',
            border: '4px solid #6200ea'
          }}
        />
        <h2>{user.name}</h2>
        <p style={{ color: '#666', marginBottom: '1rem' }}>{user.email}</p>
        <p style={{ maxWidth: '500px' }}>{user.bio}</p>
      </div>
    </div>
  );
};
