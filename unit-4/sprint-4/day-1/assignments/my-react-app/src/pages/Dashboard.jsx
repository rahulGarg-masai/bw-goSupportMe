import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../services/firebaseService';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      if (currentUser) {
        try {
          const projectsData = await projectService.getAll(currentUser.uid);
          setProjects(projectsData);
        } catch (error) {
          console.error('Error fetching projects:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProjects();
  }, [currentUser]);

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectService.delete(currentUser.uid, projectId);
        setProjects(projects.filter(project => project.id !== projectId));
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>My Projects</h1>
        <Link 
          to="/add-project"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <h3>No projects yet</h3>
          <p>Create your first project to get started!</p>
          <Link 
            to="/add-project"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {projects.map((project) => (
            <div 
              key={project.id} 
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '1.5rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3 style={{ marginBottom: '0.5rem' }}>{project.title}</h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>{project.description}</p>
              <p style={{ fontSize: '0.875rem', color: '#888', marginBottom: '1rem' }}>
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <Link 
                  to={`/project/${project.id}`}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#28a745',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}
                >
                  View Tasks
                </Link>
                <Link 
                  to={`/edit-project/${project.id}`}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#ffc107',
                    color: 'black',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    fontSize: '0.875rem'
                  }}
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDeleteProject(project.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.875rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
