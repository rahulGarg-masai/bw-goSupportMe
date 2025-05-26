import { useUserContext } from '../context/UserContext';

export const Profile = () => {
  const { user } = useUserContext();

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>User Profile</h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop: '1.5rem'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <img 
            src={user.avatar} 
            alt={user.name}
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #6200ea'
            }}
          />
          <div>
            <h2 style={{ margin: 0 }}>{user.name}</h2>
            <p style={{ color: '#666', margin: '0.5rem 0' }}>{user.email}</p>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h3>About Me</h3>
          <p>{user.bio}</p>
        </div>
        
        <div style={{ marginTop: '1.5rem' }}>
          <h3>Contact Information</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
            <div style={{ fontWeight: 'bold' }}>Email:</div>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
