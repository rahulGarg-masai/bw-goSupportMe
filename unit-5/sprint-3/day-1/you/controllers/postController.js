const Post = require('../models/post.model');
const Tag = require('../models/tag.model');
const mongoose = require('mongoose');

const createPost = async (req,res) => {
    try {
        const {title,content,tags}=req.body;
        const tagIds = [];
        if(tags&&tags.length>0){
            for(const tagName of tags){
                let tag = await Tag.findOne({name:tagName.toLoweCase()});

            }
        }
const post = new Post({
    title,
    content,
    author:req.user._id,
    tags:tagIds
});
await post.save();
await post.populate('author','username','tags','username','email');
res.status(201).json({msg:'posts created successfully'});


    } catch (error) {
        res.status(400).json({msg:'error',error});
    }
}

const getAllPosts = async (req,res) => {
    try {
        const posts = await Post.find().populate('author');
        res,status(200).json({msg:'all posts of the author fetched'});
    } catch (error) {
        res.status(400).json({msg:'error',error});
        
    }
}

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'username email')
      .populate('tags', 'name')
      .populate('comments.user', 'username');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (req.user.role !== 'Moderator' && post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }
    
    await post.deleteOne();
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    post.comments.push({
      user: req.user._id,
      text
    });
    
    await post.save();
    await post.populate('comments.user', 'username');
    
    res.status(201).json({
      message: 'Comment added successfully',
      comment: post.comments[post.comments.length - 1]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  addComment,

};