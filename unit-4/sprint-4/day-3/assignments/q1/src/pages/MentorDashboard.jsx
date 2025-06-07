import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAnonymizedEntries, saveMentorComment, getMentorComments } from '../services/firebaseService';
import ReactMarkdown from 'react-markdown';

const MentorDashboard = () => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await getAnonymizedEntries();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setEntries(sortedData);
      
      const commentsData = {};
      for (let entry of sortedData) {
        const entryComments = await getMentorComments(entry.userId, entry.id);
        if (entryComments) {
          commentsData[entry.id] = entryComments;
        }
      }
      setComments(commentsData);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
    setLoading(false);
  };

  const handleAddComment = async (entry) => {
    if (!comment.trim()) return;

    try {
      await saveMentorComment(entry.userId, entry.id, comment);
      setComments(prev => ({
        ...prev,
        [entry.id]: {
          comment,
          timestamp: Date.now(),
          mentorId: 'mentor'
        }
      }));
      setComment('');
      setSelectedEntry(null);
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const getFilteredEntries = () => {
    switch (filter) {
      case 'high-stress':
        return entries.filter(entry => entry.stressLevel >= 7);
      case 'low-focus':
        return entries.filter(entry => entry.focus <= 4);
      case 'good-performance':
        return entries.filter(entry => entry.focus >= 8 && entry.stressLevel <= 4);
      case 'needs-attention':
        return entries.filter(entry => entry.stressLevel >= 7 || entry.focus <= 4);
      default:
        return entries;
    }
  };

  const generateSuggestion = (entry) => {
    const suggestions = [];
    
    if (entry.sleep < 6) {
      suggestions.push('Consider improving sleep schedule - aim for 7-8 hours');
    }
    if (entry.stressLevel >= 7) {
      suggestions.push('High stress detected - try meditation or breathing exercises');
    }
    if (entry.focus <= 4) {
      suggestions.push('Focus improvement needed - try Pomodoro technique');
    }
    if (entry.breakTime < 1) {
      suggestions.push('Take more breaks to prevent burnout');
    }
    if (entry.studyHours > 10) {
      suggestions.push('Consider reducing study hours to maintain quality over quantity');
    }
    
    return suggestions;
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

  const filterStyle = {
    marginBottom: '2rem'
  };

  const selectStyle = {
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '1.5rem'
  };

  const entryCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  };

  const entryHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #e5e7eb'
  };

  const metricsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.5rem',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  };

  const metricStyle = (value, type) => {
    let color = '#6b7280';
    if (type === 'stress' && value >= 7) color = '#dc2626';
    if (type === 'focus' && value <= 4) color = '#dc2626';
    if (type === 'focus' && value >= 8) color = '#059669';
    if (type === 'sleep' && value < 6) color = '#dc2626';
    
    return { color };
  };

  const reflectionStyle = {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  };

  const suggestionStyle = {
    backgroundColor: '#eff6ff',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.9rem'
  };

  const commentSectionStyle = {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb'
  };

  const existingCommentStyle = {
    backgroundColor: '#f0fdf4',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    border: '1px solid #bbf7d0'
  };

  const textareaStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '0.9rem',
    minHeight: '80px',
    marginBottom: '0.5rem'
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginRight: '0.5rem'
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6b7280'
  };

  if (loading) {
    return <div style={containerStyle}>Loading mentor dashboard...</div>;
  }

  const filteredEntries = getFilteredEntries();

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Mentor Dashboard</h1>
      
      <div style={filterStyle}>
        <label style={{ marginRight: '1rem', fontWeight: '500' }}>Filter entries:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Entries</option>
          <option value="needs-attention">Needs Attention</option>
          <option value="high-stress">High Stress</option>
          <option value="low-focus">Low Focus</option>
          <option value="good-performance">Good Performance</option>
        </select>
        <span style={{ marginLeft: '1rem', color: '#6b7280' }}>
          Showing {filteredEntries.length} of {entries.length} entries
        </span>
      </div>

      {filteredEntries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No entries match the selected filter.
        </div>
      ) : (
        <div style={gridStyle}>
          {filteredEntries.map((entry) => {
            const suggestions = generateSuggestion(entry);
            const hasComment = comments[entry.id];
            
            return (
              <div key={entry.id} style={entryCardStyle}>
                <div style={entryHeaderStyle}>
                  <div>
                    <strong>Student #{entry.userId}</strong>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>

                <div style={metricsStyle}>
                  <div>
                    <strong>Study:</strong> 
                    <span style={metricStyle(entry.studyHours, 'study')}> {entry.studyHours}h</span>
                  </div>
                  <div>
                    <strong>Sleep:</strong> 
                    <span style={metricStyle(entry.sleep, 'sleep')}> {entry.sleep}h</span>
                  </div>
                  <div>
                    <strong>Stress:</strong> 
                    <span style={metricStyle(entry.stressLevel, 'stress')}> {entry.stressLevel}/10</span>
                  </div>
                  <div>
                    <strong>Focus:</strong> 
                    <span style={metricStyle(entry.focus, 'focus')}> {entry.focus}/10</span>
                  </div>
                </div>

                {entry.reflection && (
                  <div style={reflectionStyle}>
                    <strong>Reflection:</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                      <ReactMarkdown>{entry.reflection}</ReactMarkdown>
                    </div>
                  </div>
                )}

                {suggestions.length > 0 && (
                  <div style={suggestionStyle}>
                    <strong>💡 Suggested Focus Areas:</strong>
                    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
                      {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div style={commentSectionStyle}>
                  {hasComment ? (
                    <div style={existingCommentStyle}>
                      <strong>✨ Mentor Comment:</strong>
                      <div style={{ marginTop: '0.5rem' }}>{hasComment.comment}</div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem' }}>
                        {new Date(hasComment.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  ) : selectedEntry === entry.id ? (
                    <div>
                      <strong>Add positive comment:</strong>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        style={textareaStyle}
                        placeholder="Write an encouraging comment or suggestion..."
                      />
                      <div>
                        <button
                          style={buttonStyle}
                          onClick={() => handleAddComment(entry)}
                        >
                          Save Comment
                        </button>
                        <button
                          style={cancelButtonStyle}
                          onClick={() => {
                            setSelectedEntry(null);
                            setComment('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      style={buttonStyle}
                      onClick={() => setSelectedEntry(entry.id)}
                    >
                      Add Comment
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MentorDashboard;
