const Mentor = require('../models/Mentor');
const Learner = require('../models/Learner');
const Session = require('../models/Session');

class QueryService {
  
  async findActiveSessionsForMentor(mentorId) {
    return await Session.findActive()
      .find({ mentor: mentorId })
      .populate('mentor', 'name email')
      .populate('attendance.learner', 'name email')
      .sort({ scheduledTime: 1 });
  }

  async findActiveSessionsForLearner(learnerId) {
    return await Session.findActive()
      .find({ 'attendance.learner': learnerId })
      .populate('mentor', 'name email expertise')
      .populate('attendance.learner', 'name email')
      .sort({ scheduledTime: 1 });
  }

  async fetchRecentSessions(limit = 5) {
    return await Session.findActive()
      .sort({ scheduledTime: -1 })
      .limit(limit)
      .populate('mentor', 'name email expertise')
      .select('title topic scheduledTime duration status attendance');
  }

  async countLearnersForMentor(mentorId) {
    const sessions = await Session.findActive()
      .find({ mentor: mentorId })
      .select('attendance');
    
    const uniqueLearners = new Set();
    sessions.forEach(session => {
      session.attendance.forEach(att => {
        if (att.status === 'attended' || att.status === 'registered') {
          uniqueLearners.add(att.learner.toString());
        }
      });
    });
    
    return uniqueLearners.size;
  }

  async listMentorsForLearner(learnerId) {
    const sessions = await Session.findActive()
      .find({ 'attendance.learner': learnerId })
      .populate('mentor', 'name email expertise bio')
      .select('mentor');
    
    const mentors = sessions.map(session => session.mentor);
    const uniqueMentors = mentors.filter((mentor, index, self) => 
      index === self.findIndex(m => m._id.toString() === mentor._id.toString())
    );
    
    return uniqueMentors;
  }

  async listLearnersForSession(sessionId) {
    const session = await Session.findById(sessionId)
      .populate('attendance.learner', 'name email level interests')
      .select('attendance');
    
    return session ? session.attendance.map(att => ({
      learner: att.learner,
      status: att.status,
      feedback: att.feedback,
      notes: att.notes
    })) : [];
  }

  async findMentorsWithNoActiveSessions() {
    const mentorsWithSessions = await Session.findActive()
      .distinct('mentor');
    
    return await Mentor.findActive()
      .find({ _id: { $nin: mentorsWithSessions } })
      .select('name email expertise bio');
  }

  async findLearnersWithMoreThanNSessions(sessionCount = 3) {
    const sessions = await Session.find({ 
      isActive: true, 
      isArchived: false,
      'attendance.status': { $in: ['attended', 'registered'] }
    })
    .select('attendance');
    
    const learnerSessionCount = new Map();
    
    sessions.forEach(session => {
      session.attendance.forEach(att => {
        if (att.status === 'attended' || att.status === 'registered') {
          const learnerId = att.learner.toString();
          learnerSessionCount.set(learnerId, (learnerSessionCount.get(learnerId) || 0) + 1);
        }
      });
    });
    
    const qualifiedLearnerIds = Array.from(learnerSessionCount.entries())
      .filter(([_, count]) => count > sessionCount)
      .map(([learnerId, _]) => learnerId);
    
    return await Learner.findActive()
      .find({ _id: { $in: qualifiedLearnerIds } })
      .select('name email level interests');
  }

  async getSessionStatistics() {
    const totalActiveSessions = await Session.countDocuments({ isActive: true, isArchived: false });
    const totalArchivedSessions = await Session.countDocuments({ isArchived: true });
    const totalActiveMentors = await Mentor.countDocuments({ isActive: true });
    const totalActiveLearners = await Learner.countDocuments({ isActive: true });
    
    return {
      totalActiveSessions,
      totalArchivedSessions,
      totalActiveMentors,
      totalActiveLearners
    };
  }

  async findSessionsByDateRange(startDate, endDate) {
    return await Session.findActive()
      .find({
        scheduledTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate)
        }
      })
      .populate('mentor', 'name email')
      .sort({ scheduledTime: 1 });
  }

  async findCompletedSessionsWithFeedback() {
    return await Session.find({
      status: 'completed',
      isActive: true,
      'attendance.feedback.rating': { $exists: true }
    })
    .populate('mentor', 'name email')
    .populate('attendance.learner', 'name email')
    .sort({ scheduledTime: -1 });
  }
}

module.exports = new QueryService();