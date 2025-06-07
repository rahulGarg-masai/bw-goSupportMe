import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudyEntries } from '../services/firebaseService';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadEntries();
    }
  }, [currentUser]);

  const loadEntries = async () => {
    try {
      const data = await getStudyEntries(currentUser.uid);
      setEntries(data);
      calculateStats(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
    setLoading(false);
  };

  const calculateStats = (data) => {
    if (data.length === 0) {
      setStats({});
      return;
    }

    const totalEntries = data.length;
    const avgStudyHours = data.reduce((sum, entry) => sum + (entry.studyHours || 0), 0) / totalEntries;
    const avgSleep = data.reduce((sum, entry) => sum + (entry.sleep || 0), 0) / totalEntries;
    const avgStress = data.reduce((sum, entry) => sum + (entry.stressLevel || 0), 0) / totalEntries;
    
    const currentStreak = calculateStreak(data);
    
    setStats({
      totalEntries,
      avgStudyHours: avgStudyHours.toFixed(1),
      avgSleep: avgSleep.toFixed(1),
      avgStress: avgStress.toFixed(1),
      currentStreak
    });
  };

  const calculateStreak = (data) => {
    if (data.length === 0) return 0;
    
    const sortedEntries = data.sort((a, b) => new Date(b.date) - new Date(a.date));
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    let currentDate = new Date(today);
    
    for (let entry of sortedEntries) {
      const entryDate = entry.date;
      const expectedDate = currentDate.toISOString().split('T')[0];
      
      if (entryDate === expectedDate) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  const generateHeatmap = () => {
    const last30Days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const entry = entries.find(e => e.date === dateStr);
      const intensity = entry ? Math.min(entry.studyHours / 8, 1) : 0;
      
      last30Days.push({
        date: dateStr,
        intensity,
        hasEntry: !!entry
      });
    }
    
    return last30Days;
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#1f2937'
  };

  const statsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center'
  };

  const statValueStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    color: '#6b7280',
    fontSize: '0.9rem'
  };

  const heatmapStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const heatmapGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gap: '4px',
    marginTop: '1rem'
  };

  const heatmapCellStyle = (intensity) => ({
    width: '20px',
    height: '20px',
    borderRadius: '2px',
    backgroundColor: intensity > 0 ? `rgba(37, 99, 235, ${intensity})` : '#f3f4f6',
    border: '1px solid #e5e7eb'
  });

  if (loading) {
    return <div style={containerStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Dashboard</h1>
      
      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalEntries || 0}</div>
          <div style={statLabelStyle}>Total Entries</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.currentStreak || 0}</div>
          <div style={statLabelStyle}>Current Streak</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.avgStudyHours || '0.0'}h</div>
          <div style={statLabelStyle}>Avg Study Hours</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.avgSleep || '0.0'}h</div>
          <div style={statLabelStyle}>Avg Sleep</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.avgStress || '0.0'}/10</div>
          <div style={statLabelStyle}>Avg Stress Level</div>
        </div>
      </div>

      <div style={heatmapStyle}>
        <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Activity Heatmap (Last 30 Days)</h3>
        <div style={heatmapGridStyle}>
          {generateHeatmap().map((day, index) => (
            <div
              key={index}
              style={heatmapCellStyle(day.intensity)}
              title={`${day.date}: ${day.hasEntry ? 'Active' : 'No entry'}`}
            />
          ))}
        </div>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#6b7280' }}>
          Darker squares indicate more study hours
        </div>
      </div>

      {entries.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No entries yet. Start tracking your daily habits!
        </div>
      )}
    </div>
  );
};

export default Dashboard;
