export const validateEmail = (email) => {
  if (!email) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return 'Invalid email format';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

export const validateDisplayName = (displayName) => {
  if (!displayName) return 'Display name is required';
  if (displayName.length < 2) return 'Display name must be at least 2 characters';
  if (displayName.length > 50) return 'Display name must be less than 50 characters';
  return null;
};

export const validateCommunityName = (name) => {
  if (!name) return 'Community name is required';
  if (name.length < 3) return 'Community name must be at least 3 characters';
  if (name.length > 100) return 'Community name must be less than 100 characters';
  return null;
};

export const validateCommunityDescription = (description) => {
  if (!description) return 'Description is required';
  if (description.length < 10) return 'Description must be at least 10 characters';
  if (description.length > 500) return 'Description must be less than 500 characters';
  return null;
};

export const validatePostTitle = (title) => {
  if (!title) return 'Post title is required';
  if (title.length < 5) return 'Title must be at least 5 characters';
  if (title.length > 200) return 'Title must be less than 200 characters';
  return null;
};

export const validatePostContent = (content) => {
  if (!content || content.trim().length === 0) return 'Post content is required';
  if (content.length > 10000) return 'Content must be less than 10,000 characters';
  return null;
};

export const validateComment = (comment) => {
  if (!comment || comment.trim().length === 0) return 'Comment cannot be empty';
  if (comment.length > 2000) return 'Comment must be less than 2,000 characters';
  return null;
};

export const validateURL = (url) => {
  if (!url) return null;
  try {
    new URL(url);
    return null;
  } catch {
    return 'Invalid URL format';
  }
};

export const validateFileSize = (file, maxSizeMB = 5) => {
  if (!file) return null;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`;
  }
  return null;
};

export const validateImageFile = (file) => {
  if (!file) return null;
  
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return 'Only JPEG, PNG, GIF, and WebP images are allowed';
  }
  
  return validateFileSize(file, 10);
};

export const validateFormData = (data, rules) => {
  const errors = {};
  
  for (const [field, validators] of Object.entries(rules)) {
    for (const validator of validators) {
      const error = validator(data[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};