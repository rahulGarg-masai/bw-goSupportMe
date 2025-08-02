export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInMs = now - date;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  
  return date.toLocaleDateString();
};

export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const extractHashtags = (text) => {
  const hashtagRegex = /#\w+/g;
  return text.match(hashtagRegex) || [];
};

export const extractMentions = (text) => {
  const mentionRegex = /@\w+/g;
  return text.match(mentionRegex) || [];
};

export const calculateEngagementScore = (post) => {
  const { votes, commentCount, reactions } = post;
  const reactionCount = reactions ? Object.values(reactions).flat().length : 0;
  return votes + (commentCount * 2) + reactionCount;
};

export const sortPostsByAlgorithm = (posts, algorithm) => {
  switch (algorithm) {
    case 'hot':
      return [...posts].sort((a, b) => {
        const aScore = calculateEngagementScore(a) / Math.pow((Date.now() - a.createdAt) / 3600000, 1.5);
        const bScore = calculateEngagementScore(b) / Math.pow((Date.now() - b.createdAt) / 3600000, 1.5);
        return bScore - aScore;
      });
    case 'best':
      return [...posts].sort((a, b) => calculateEngagementScore(b) - calculateEngagementScore(a));
    case 'controversial':
      return [...posts].sort((a, b) => {
        const aControversy = Math.min(a.upvotes || 0, a.downvotes || 0);
        const bControversy = Math.min(b.upvotes || 0, b.downvotes || 0);
        return bControversy - aControversy;
      });
    case 'chronological':
    default:
      return [...posts].sort((a, b) => b.createdAt - a.createdAt);
  }
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};