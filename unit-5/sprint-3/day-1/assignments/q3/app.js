const express = require('express');
const mongoose = require('mongoose');
const Mentor = require('./models/Mentor');
const Learner = require('./models/Learner');
const Session = require('./models/Session');
const queryService = require('./services/queryService');

const app = express();
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mentorhub', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

app.get('/api/mentors/:id/sessions', async (req, res) => {
  try {
    const sessions = await queryService.findActiveSessionsForMentor(req.params.id);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/learners/:id/sessions', async (req, res) => {
  try {
    const sessions = await queryService.findActiveSessionsForLearner(req.params.id);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sessions/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const sessions = await queryService.fetchRecentSessions(limit);
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mentors/:id/learner-count', async (req, res) => {
  try {
    const count = await queryService.countLearnersForMentor(req.params.id);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/learners/:id/mentors', async (req, res) => {
  try {
    const mentors = await queryService.listMentorsForLearner(req.params.id);
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/sessions/:id/learners', async (req, res) => {
  try {
    const learners = await queryService.listLearnersForSession(req.params.id);
    res.json(learners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/mentors/no-sessions', async (req, res) => {
  try {
    const mentors = await queryService.findMentorsWithNoActiveSessions();
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/learners/active', async (req, res) => {
  try {
    const sessionCount = parseInt(req.query.minSessions) || 3;
    const learners = await queryService.findLearnersWithMoreThanNSessions(sessionCount);
    res.json(learners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/statistics', async (req, res) => {
  try {
    const stats = await queryService.getSessionStatistics();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/mentors/:id/soft', async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }
    await mentor.softDelete();
    res.json({ message: 'Mentor soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/learners/:id/soft', async (req, res) => {
  try {
    const learner = await Learner.findById(req.params.id);
    if (!learner) {
      return res.status(404).json({ error: 'Learner not found' });
    }
    await learner.softDelete();
    res.json({ message: 'Learner soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sessions/:id/archive', async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    await session.archiveSession();
    res.json({ message: 'Session archived successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'MentorHub API is running' });
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`MentorHub API server running on port ${PORT}`);
      console.log('Available endpoints:');
      console.log('  GET  /api/mentors/:id/sessions - Get active sessions for a mentor');
      console.log('  GET  /api/learners/:id/sessions - Get active sessions for a learner');
      console.log('  GET  /api/sessions/recent?limit=5 - Get recent sessions');
      console.log('  GET  /api/mentors/:id/learner-count - Count learners for a mentor');
      console.log('  GET  /api/learners/:id/mentors - Get mentors for a learner');
      console.log('  GET  /api/sessions/:id/learners - Get learners for a session');
      console.log('  GET  /api/mentors/no-sessions - Get mentors with no active sessions');
      console.log('  GET  /api/learners/active?minSessions=3 - Get active learners');
      console.log('  GET  /api/statistics - Get system statistics');
      console.log('  POST /api/sessions/:id/archive - Archive a session');
      console.log('  DELETE /api/mentors/:id/soft - Soft delete a mentor');
      console.log('  DELETE /api/learners/:id/soft - Soft delete a learner');
    });
  });
}

module.exports = app;