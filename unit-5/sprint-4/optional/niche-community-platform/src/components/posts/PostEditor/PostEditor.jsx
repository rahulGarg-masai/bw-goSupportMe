import { useState, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { createNewPost } from '../../../store/feedSlice';
import { uploadFile } from '../../../services/api';
import { validatePostTitle, validatePostContent } from '../../../utils/validators';
import { POST_TYPES } from '../../../utils/constants';
import './PostEditor.css';

const PostEditor = ({ communityId, onClose, onSuccess }) => {
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    type: POST_TYPES.TEXT,
    tags: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  const dispatch = useDispatch();
  const quillRef = useRef();

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  }), []);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'blockquote', 'code-block',
    'link', 'image'
  ];

  const handleChange = (field, value) => {
    setPostData(prev => ({ ...prev, [field]: value }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUpload = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        setIsUploading(true);
        try {
          const imageUrl = await uploadFile(file, `posts/images/${Date.now()}_${file.name}`);
          const quill = quillRef.current.getEditor();
          const range = quill.getSelection();
          quill.insertEmbed(range.index, 'image', imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image');
        } finally {
          setIsUploading(false);
        }
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    const titleError = validatePostTitle(postData.title);
    const contentError = validatePostContent(postData.content);
    
    if (titleError) newErrors.title = titleError;
    if (contentError) newErrors.content = contentError;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      const tags = postData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);
        
      const newPost = {
        ...postData,
        communityId,
        tags,
        votes: 0,
        reactions: {},
        commentCount: 0,
        createdAt: new Date(),
        userId: 'current-user-id', // Replace with actual user ID
      };
      
      await dispatch(createNewPost(newPost)).unwrap();
      
      if (onSuccess) {
        onSuccess();
      }
      
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setErrors({ submit: 'Failed to create post. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="post-editor-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="post-editor"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 500 }}
      >
        <div className="post-editor-header">
          <h2>Create New Post</h2>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        {errors.submit && (
          <div className="error-message">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={postData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="What's your post about?"
              className={errors.title ? 'error' : ''}
              disabled={isLoading}
            />
            {errors.title && <span className="field-error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Content</label>
            <div className="quill-wrapper">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={postData.content}
                onChange={(content) => handleChange('content', content)}
                modules={modules}
                formats={formats}
                placeholder="Share your thoughts..."
                readOnly={isLoading}
              />
              {isUploading && (
                <div className="upload-overlay">
                  <div className="upload-spinner"></div>
                  <p>Uploading image...</p>
                </div>
              )}
            </div>
            {errors.content && <span className="field-error">{errors.content}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              type="text"
              id="tags"
              value={postData.tags}
              onChange={(e) => handleChange('tags', e.target.value)}
              placeholder="programming, react, javascript"
              disabled={isLoading}
            />
            <small>Separate tags with commas</small>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={isLoading || isUploading}
            >
              {isLoading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PostEditor;