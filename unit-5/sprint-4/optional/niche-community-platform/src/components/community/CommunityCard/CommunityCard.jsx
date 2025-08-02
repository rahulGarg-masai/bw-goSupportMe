import { motion } from 'framer-motion';
import { formatNumber, formatDate } from '../../../utils/helpers';
import './CommunityCard.css';

const CommunityCard = ({ community, onClick }) => {
  const {
    id,
    name,
    description,
    category,
    memberCount = 0,
    tags = [],
    createdAt,
    avatar
  } = community;

  const handleClick = () => {
    if (onClick) {
      onClick(community);
    }
  };

  return (
    <motion.div
      className="community-card"
      onClick={handleClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="community-header">
        <div className="community-avatar">
          {avatar ? (
            <img src={avatar} alt={name} />
          ) : (
            <div className="avatar-placeholder">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="community-info">
          <h3 className="community-name">{name}</h3>
          <span className="community-category">{category}</span>
        </div>
      </div>

      <div className="community-description">
        <p>{description}</p>
      </div>

      <div className="community-tags">
        {tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
        {tags.length > 3 && (
          <span className="tag-more">+{tags.length - 3} more</span>
        )}
      </div>

      <div className="community-footer">
        <div className="member-count">
          <span className="icon">👥</span>
          {formatNumber(memberCount)} members
        </div>
        <div className="created-date">
          Created {formatDate(createdAt)}
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityCard;