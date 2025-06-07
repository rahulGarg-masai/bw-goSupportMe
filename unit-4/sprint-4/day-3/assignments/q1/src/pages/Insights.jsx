import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getStudyEntries } from '../services/firebaseService';
import jsPDF from 'jspdf';

const Insights = () => {
  const { currentUser } = useAuth();
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState([]);
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
      generateInsights(data);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
    setLoading(false);
  };

  const generateInsights = (data) => {
    if (data.length < 7) {
      setInsights([
        {
          type: 'info',
          message: `You have ${data.length} entries. Keep logging for 7 days to unlock personalized insights!`,
          icon: '📊'
        }
      ]);
      return;
    }

    const newInsights = [];

    const avgSleep = data.reduce((sum, entry) => sum + (entry.sleep || 0), 0) / data.length;
    const avgFocus = data.reduce((sum, entry) => sum + (entry.focus || 0), 0) / data.length;
    const avgStress = data.reduce((sum, entry) => sum + (entry.stressLevel || 0), 0) / data.length;

    const highSleepDays = data.filter(entry => entry.sleep >= 8);
    const lowSleepDays = data.filter(entry => entry.sleep < 6);

    if (highSleepDays.length > 0 && lowSleepDays.length > 0) {
      const highSleepFocus = highSleepDays.reduce((sum, entry) => sum + (entry.focus || 0), 0) / highSleepDays.length;
      const lowSleepFocus = lowSleepDays.reduce((sum, entry) => sum + (entry.focus || 0), 0) / lowSleepDays.length;
      
      if (highSleepFocus > lowSleepFocus + 1) {
        newInsights.push({
          type: 'positive',
          message: 'You focus better after 8+ hours of sleep. Your focus improves by ' + 
                  (highSleepFocus - lowSleepFocus).toFixed(1) + ' points with adequate sleep!',
          icon: '😴'
        });
      }
    }

    const longBreakDays = data.filter(entry => entry.breakTime >= 2);
    const shortBreakDays = data.filter(entry => entry.breakTime < 1);

    if (longBreakDays.length > 0 && shortBreakDays.length > 0) {
      const longBreakStress = longBreakDays.reduce((sum, entry) => sum + (entry.stressLevel || 0), 0) / longBreakDays.length;
      const shortBreakStress = shortBreakDays.reduce((sum, entry) => sum + (entry.stressLevel || 0), 0) / shortBreakDays.length;
      
      if (longBreakStress < shortBreakStress - 1) {
        newInsights.push({
          type: 'positive',
          message: 'Longer breaks seem to reduce stress levels. Your stress decreases by ' + 
                  (shortBreakStress - longBreakStress).toFixed(1) + ' points with adequate breaks!',
          icon: '🧘'
        });
      }
    }

    if (avgStress > 7) {
      newInsights.push({
        type: 'warning',
        message: 'Your average stress level is high (' + avgStress.toFixed(1) + '/10). Consider stress management techniques.',
        icon: '⚠️'
      });
    }

    if (avgFocus < 5) {
      newInsights.push({
        type: 'suggestion',
        message: 'Your focus levels could improve. Try the Pomodoro technique or eliminate distractions.',
        icon: '🎯'
      });
    }

    const recentEntries = data.slice(-7);
    const streak = calculateCurrentStreak(data);
    
    if (streak >= 7) {
      newInsights.push({
        type: 'celebration',
        message: `Amazing! You've maintained a ${streak}-day streak. Keep up the excellent work!`,
        icon: '🔥'
      });
    }

    const studyPattern = analyzeStudyPattern(recentEntries);
    if (studyPattern) {
      newInsights.push({
        type: 'info',
        message: studyPattern,
        icon: '📈'
      });
    }

    setInsights(newInsights);
  };

  const calculateCurrentStreak = (data) => {
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

  const analyzeStudyPattern = (recentEntries) => {
    if (recentEntries.length < 5) return null;
    
    const avgStudyHours = recentEntries.reduce((sum, entry) => sum + (entry.studyHours || 0), 0) / recentEntries.length;
    
    if (avgStudyHours > 6) {
      return 'You\'ve been studying consistently with ' + avgStudyHours.toFixed(1) + ' hours per day. Great dedication!';
    } else if (avgStudyHours < 3) {
      return 'Your study hours have been low recently. Consider setting a daily study goal.';
    }
    
    return null;
  };

  const exportToPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    let yPosition = 20;

    pdf.setFontSize(20);
    pdf.text('Study & Wellness Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 20;

    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition);
    yPosition += 10;
    pdf.text(`Total Entries: ${entries.length}`, 20, yPosition);
    yPosition += 20;

    pdf.setFontSize(16);
    pdf.text('Insights:', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(12);
    insights.forEach((insight, index) => {
      if (yPosition > 250) {
        pdf.addPage();
        yPosition = 20;
      }
      
      const lines = pdf.splitTextToSize(`${index + 1}. ${insight.message}`, pageWidth - 40);
      pdf.text(lines, 20, yPosition);
      yPosition += lines.length * 7 + 5;
    });

    if (entries.length > 0) {
      pdf.addPage();
      yPosition = 20;
      
      pdf.setFontSize(16);
      pdf.text('Recent Entries:', 20, yPosition);
      yPosition += 15;

      pdf.setFontSize(10);
      const recentEntries = entries.slice(-10).reverse();
      
      recentEntries.forEach((entry, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        pdf.text(`Date: ${entry.date}`, 20, yPosition);
        yPosition += 7;
        pdf.text(`Study: ${entry.studyHours}h | Sleep: ${entry.sleep}h | Stress: ${entry.stressLevel}/10 | Focus: ${entry.focus}/10`, 20, yPosition);
        yPosition += 7;
        
        if (entry.reflection) {
          const reflectionLines = pdf.splitTextToSize(`Reflection: ${entry.reflection}`, pageWidth - 40);
          pdf.text(reflectionLines, 20, yPosition);
          yPosition += reflectionLines.length * 5;
        }
        
        yPosition += 10;
      });
    }

    pdf.save('study-wellness-report.pdf');
  };

  const containerStyle = {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto'
  };

  const titleStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    color: '#1f2937'
  };

  const insightCardStyle = (type) => ({
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
    borderLeft: `4px solid ${
      type === 'positive' ? '#10b981' :
      type === 'warning' ? '#f59e0b' :
      type === 'celebration' ? '#8b5cf6' :
      type === 'suggestion' ? '#3b82f6' : '#6b7280'
    }`
  });

  const insightHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem'
  };

  const iconStyle = {
    fontSize: '1.5rem',
    marginRight: '0.5rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '2rem'
  };

  if (loading) {
    return <div style={containerStyle}>Loading insights...</div>;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Insights & Motivation</h1>
      
      {insights.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
          No insights available yet. Keep logging your daily habits!
        </div>
      ) : (
        <div>
          {insights.map((insight, index) => (
            <div key={index} style={insightCardStyle(insight.type)}>
              <div style={insightHeaderStyle}>
                <span style={iconStyle}>{insight.icon}</span>
                <h3 style={{ margin: 0, color: '#1f2937' }}>
                  {insight.type === 'positive' ? 'Great Pattern!' :
                   insight.type === 'warning' ? 'Attention Needed' :
                   insight.type === 'celebration' ? 'Celebration!' :
                   insight.type === 'suggestion' ? 'Suggestion' : 'Insight'}
                </h3>
              </div>
              <p style={{ margin: 0, color: '#4b5563' }}>{insight.message}</p>
            </div>
          ))}
        </div>
      )}

      {entries.length > 0 && (
        <button style={buttonStyle} onClick={exportToPDF}>
          Export Report as PDF
        </button>
      )}
    </div>
  );
};

export default Insights;
