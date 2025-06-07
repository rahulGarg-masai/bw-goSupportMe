import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { saveStudyEntry, getStudyEntries, updateStudyEntry } from '../services/firebaseService';
import { requestNotificationPermission, celebrateStreak, getMotivationalMessage, checkMissedDays, calculateCurrentStreak } from '../utils/notifications';
import ReactMarkdown from 'react-markdown';

const DailyTracker = () => {
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    studyHours: '',
    breakTime: '',
    sleep: '',
    stressLevel: '',
    focus: '',
    reflection: ''
  });
  const [todayEntry, setTodayEntry] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (currentUser) {
      checkTodayEntry();
      requestNotificationPermission();
    }
  }, [currentUser]);

  const checkTodayEntry = async () => {
    try {
      const entries = await getStudyEntries(currentUser.uid);
      const todayEntryData = entries.find(entry => entry.date === today);
      if (todayEntryData) {
        setTodayEntry(todayEntryData);
        setFormData({
          studyHours: todayEntryData.studyHours || '',
          breakTime: todayEntryData.breakTime || '',
          sleep: todayEntryData.sleep || '',
          stressLevel: todayEntryData.stressLevel || '',
          focus: todayEntryData.focus || '',
          reflection: todayEntryData.reflection || ''
        });
      }
      
      if (entries.length > 0) {
        const lastEntry = entries.sort((a, b) => new Date(b.date) - new Date(a.date))[0];
        checkMissedDays(lastEntry.date);
      }
    } catch (error) {
      console.error('Error checking today entry:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const entryData = {
        ...formData,
        studyHours: parseFloat(formData.studyHours) || 0,
        breakTime: parseFloat(formData.breakTime) || 0,
        sleep: parseFloat(formData.sleep) || 0,
        stressLevel: parseInt(formData.stressLevel) || 0,
        focus: parseInt(formData.focus) || 0
      };

      if (todayEntry) {
        await updateStudyEntry(currentUser.uid, todayEntry.id, entryData);
        setMessage('Entry updated successfully!');
      } else {
        await saveStudyEntry(currentUser.uid, entryData);
        setMessage('Entry saved successfully! ' + getMotivationalMessage());
        checkTodayEntry();
        
        const allEntries = await getStudyEntries(currentUser.uid);
        const streak = calculateCurrentStreak(allEntries);
        if (streak > 0 && [1, 3, 7, 14, 30, 50, 100].includes(streak)) {
          celebrateStreak(streak);
        }
      }
      
      setIsEditing(false);
    } catch (error) {
      setMessage('Error saving entry: ' + error.message);
    }
    setLoading(false);
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#1f2937'
  };

  const formStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '2rem'
  };

  const inputGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#374151'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '4px',
    fontSize: '1rem'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '120px',
    resize: 'vertical'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginRight: '1rem'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6b7280'
  };

  const messageStyle = {
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0fdf4',
    color: message.includes('Error') ? '#dc2626' : '#166534',
    border: `1px solid ${message.includes('Error') ? '#fecaca' : '#bbf7d0'}`
  };

  const previewStyle = {
    backgroundColor: '#f9fafb',
    padding: '1rem',
    borderRadius: '4px',
    border: '1px solid #e5e7eb',
    marginTop: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Daily Study & Wellness Tracker</h1>
      
      {message && <div style={messageStyle}>{message}</div>}

      {todayEntry && !isEditing ? (
        <div style={formStyle}>
          <h3 style={{ marginBottom: '1rem', color: '#1f2937' }}>Today's Entry</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div><strong>Study Hours:</strong> {todayEntry.studyHours}h</div>
            <div><strong>Break Time:</strong> {todayEntry.breakTime}h</div>
            <div><strong>Sleep:</strong> {todayEntry.sleep}h</div>
            <div><strong>Stress Level:</strong> {todayEntry.stressLevel}/10</div>
            <div><strong>Focus:</strong> {todayEntry.focus}/10</div>
          </div>
          {todayEntry.reflection && (
            <div>
              <strong>Reflection:</strong>
              <div style={previewStyle}>
                <ReactMarkdown>{todayEntry.reflection}</ReactMarkdown>
              </div>
            </div>
          )}
          <button style={buttonStyle} onClick={() => setIsEditing(true)}>
            Edit Entry
          </button>
        </div>
      ) : (
        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={inputGroupStyle}>
              <label style={labelStyle}>Study Hours</label>
              <input
                type="number"
                name="studyHours"
                value={formData.studyHours}
                onChange={handleInputChange}
                style={inputStyle}
                step="0.5"
                min="0"
                max="24"
                placeholder="e.g., 6.5"
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Break Time (hours)</label>
              <input
                type="number"
                name="breakTime"
                value={formData.breakTime}
                onChange={handleInputChange}
                style={inputStyle}
                step="0.5"
                min="0"
                max="12"
                placeholder="e.g., 2"
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Sleep (hours)</label>
              <input
                type="number"
                name="sleep"
                value={formData.sleep}
                onChange={handleInputChange}
                style={inputStyle}
                step="0.5"
                min="0"
                max="24"
                placeholder="e.g., 8"
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Stress Level (1-10)</label>
              <input
                type="number"
                name="stressLevel"
                value={formData.stressLevel}
                onChange={handleInputChange}
                style={inputStyle}
                min="1"
                max="10"
                placeholder="1 = Low, 10 = High"
              />
            </div>

            <div style={inputGroupStyle}>
              <label style={labelStyle}>Focus Level (1-10)</label>
              <input
                type="number"
                name="focus"
                value={formData.focus}
                onChange={handleInputChange}
                style={inputStyle}
                min="1"
                max="10"
                placeholder="1 = Poor, 10 = Excellent"
              />
            </div>
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Daily Reflection (Markdown supported)</label>
            <textarea
              name="reflection"
              value={formData.reflection}
              onChange={handleInputChange}
              style={textareaStyle}
              placeholder="Reflect on your day, challenges, achievements, and feelings..."
            />
            <div style={{ marginTop: '0.5rem' }}>
              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
            </div>
            {showPreview && formData.reflection && (
              <div style={previewStyle}>
                <ReactMarkdown>{formData.reflection}</ReactMarkdown>
              </div>
            )}
          </div>

          <div>
            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? 'Saving...' : (todayEntry ? 'Update Entry' : 'Save Entry')}
            </button>
            {isEditing && (
              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={() => {
                  setIsEditing(false);
                  checkTodayEntry();
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default DailyTracker;
