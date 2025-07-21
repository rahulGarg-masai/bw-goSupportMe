import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { fetchPosts } from '../../../store/feedSlice';
import { useRealtime } from '../../../hooks/useRealtime';
import PostCard from '../../posts/PostCard';
import PostEditor from '../../posts/PostEditor';
import { FEED_ALGORITHMS } from '../../../utils/constants';
import { sortPostsByAlgorithm } from '../../../utils/helpers';
import './FeedContainer.css';

const FeedContainer = ({ communityId, currentUserId }) => {
  const [showPostEditor, setShowPostEditor] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(FEED_ALGORITHMS.CHRONOLOGICAL);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.feed);
  
  // Use real-time updates for live feed
  const { data: realtimePosts, isLoading: realtimeLoading } = useRealtime('posts', 
    communityId ? [['communityId', '==', communityId]] : []
  );

  const displayPosts = realtimePosts.length > 0 ? realtimePosts : posts;
  const sortedPosts = sortPostsByAlgorithm(displayPosts, selectedAlgorithm);

  useEffect(() => {
    if (communityId) {
      dispatch(fetchPosts({ communityId }));
    }
  }, [dispatch, communityId]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchPosts({ communityId }));
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const handlePostClick = (post) => {
    // Navigate to post detail or expand inline
    console.log('Post clicked:', post.id);
  };

  const renderSkeletonPosts = () => {
    return Array.from({ length: 3 }, (_, i) => (
      <div key={i} className="post-skeleton">
        <div className="skeleton-header">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-author">
            <div className="skeleton-name"></div>
            <div className="skeleton-date"></div>
          </div>
        </div>
        <div className="skeleton-title"></div>
        <div className="skeleton-content">
          <div className="skeleton-line"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line short"></div>
        </div>
        <div className="skeleton-actions">
          <div className="skeleton-vote"></div>
          <div className="skeleton-comment"></div>
          <div className="skeleton-react"></div>
        </div>
      </div>
    ));
  };

  return (
    <div className="feed-container">
      <div className="feed-header">
        <div className="feed-controls">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="algorithm-select"
          >
            <option value={FEED_ALGORITHMS.CHRONOLOGICAL}>🕒 Latest</option>
            <option value={FEED_ALGORITHMS.HOT}>🔥 Hot</option>
            <option value={FEED_ALGORITHMS.BEST}>⭐ Best</option>
            <option value={FEED_ALGORITHMS.CONTROVERSIAL}>💥 Controversial</option>
          </select>

          <button
            onClick={handleRefresh}
            className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
            disabled={isLoading}
          >
            🔄 Refresh
          </button>
        </div>

        <button
          onClick={() => setShowPostEditor(true)}
          className="create-post-button"
        >
          ✏️ Create Post
        </button>
      </div>

      <div className="feed-content">
        {(isLoading || realtimeLoading) && !displayPosts.length ? (
          <div className="skeleton-container">
            {renderSkeletonPosts()}
          </div>
        ) : (
          <>
            {sortedPosts.length === 0 ? (
              <div className="empty-feed">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="empty-state"
                >
                  <div className="empty-icon">📝</div>
                  <h3>No posts yet</h3>
                  <p>Be the first to share something with the community!</p>
                  <button
                    onClick={() => setShowPostEditor(true)}
                    className="create-first-post-button"
                  >
                    Create First Post
                  </button>
                </motion.div>
              </div>
            ) : (
              <div className="posts-list">
                <AnimatePresence mode="popLayout">
                  {sortedPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: index * 0.1,
                          duration: 0.5,
                          ease: "easeOut"
                        }
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: -50,
                        transition: { duration: 0.3 }
                      }}
                      className="post-item"
                    >
                      <PostCard
                        post={post}
                        currentUserId={currentUserId}
                        onClick={handlePostClick}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {/* Activity Indicators */}
        {sortedPosts.length > 0 && (
          <motion.div 
            className="activity-indicators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="indicator trending">🔥 {sortedPosts.filter(p => p.votes > 10).length} trending</div>
            <div className="indicator active">💬 {sortedPosts.filter(p => p.commentCount > 5).length} active discussions</div>
            <div className="indicator new">🆕 {sortedPosts.filter(p => Date.now() - new Date(p.createdAt).getTime() < 3600000).length} new posts</div>
          </motion.div>
        )}
      </div>

      {/* Post Editor Modal */}
      <AnimatePresence>
        {showPostEditor && (
          <PostEditor
            communityId={communityId}
            onClose={() => setShowPostEditor(false)}
            onSuccess={() => {
              setShowPostEditor(false);
              handleRefresh();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedContainer;