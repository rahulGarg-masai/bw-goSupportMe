import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { voteOnPost, addReaction } from '../../../store/feedSlice';
import { formatDate, formatNumber } from '../../../utils/helpers';
import { REACTIONS } from '../../../utils/constants';
import './PostCard.css';

const PostCard = ({ post, currentUserId, onClick }) => {
  const [showReactions, setShowReactions] = useState(false);
  const dispatch = useDispatch();

  const {
    id,
    title,
    content,
    votes = 0,
    reactions = {},
    commentCount = 0,
    createdAt,
    userId,
    tags = [],
    author // Assume this contains user info
  } = post;

  const handleVote = async (voteType, e) => {
    e.stopPropagation();
    try {
      await dispatch(voteOnPost({ postId: id, voteType, userId: currentUserId }));
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleReaction = async (reaction, e) => {
    e.stopPropagation();
    try {
      await dispatch(addReaction({ postId: id, reaction, userId: currentUserId }));
      setShowReactions(false);
    } catch (error) {
      console.error('Error adding reaction:', error);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(post);
    }
  };

  const getReactionCount = (reaction) => {
    return reactions[reaction] ? reactions[reaction].length : 0;
  };

  const hasUserReacted = (reaction) => {
    return reactions[reaction] ? reactions[reaction].includes(currentUserId) : false;
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <motion.article
      className="post-card"
      onClick={handleCardClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
    >
      <div className="post-header">
        <div className="author-info">
          <div className="author-avatar">
            {author?.avatar ? (
              <img src={author.avatar} alt={author.displayName} />
            ) : (
              <div className="avatar-placeholder">
                {author?.displayName?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <div className="author-details">
            <span className="author-name">{author?.displayName || 'Anonymous'}</span>
            <span className="post-date">{formatDate(createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="post-content">
        <h2 className="post-title">{title}</h2>
        <div className="post-excerpt">
          {stripHtml(content)}
        </div>
      </div>

      {tags.length > 0 && (
        <div className="post-tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag">
              #{tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="tag-more">+{tags.length - 3} more</span>
          )}
        </div>
      )}

      <div className="post-footer">
        <div className="post-actions">
          <div className="vote-section">
            <button
              className={`vote-button upvote ${votes > 0 ? 'positive' : ''}`}
              onClick={(e) => handleVote('up', e)}
              title="Upvote"
            >
              ↑
            </button>
            <span className="vote-count">{formatNumber(votes)}</span>
            <button
              className={`vote-button downvote ${votes < 0 ? 'negative' : ''}`}
              onClick={(e) => handleVote('down', e)}
              title="Downvote"
            >
              ↓
            </button>
          </div>

          <button className="action-button comments" title="Comments">
            💬 {formatNumber(commentCount)}
          </button>

          <div className="reaction-section">
            <button
              className="action-button reactions"
              onClick={(e) => {
                e.stopPropagation();
                setShowReactions(!showReactions);
              }}
              title="React"
            >
              😀 React
            </button>

            {showReactions && (
              <motion.div
                className="reaction-picker"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {Object.entries(REACTIONS).map(([key, emoji]) => (
                  <button
                    key={key}
                    className={`reaction-option ${hasUserReacted(key) ? 'active' : ''}`}
                    onClick={(e) => handleReaction(key, e)}
                    title={key}
                  >
                    {emoji}
                    {getReactionCount(key) > 0 && (
                      <span className="reaction-count">{getReactionCount(key)}</span>
                    )}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <div className="post-stats">
          {Object.entries(reactions).map(([reaction, users]) => {
            if (users.length === 0) return null;
            return (
              <span key={reaction} className="reaction-stat">
                {REACTIONS[reaction]} {users.length}
              </span>
            );
          })}
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;