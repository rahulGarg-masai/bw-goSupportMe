const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5
    },
    content:{
        type:String,
        required:true,
        minLength:20
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    },
    tags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:[],
    }],
    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    comments:[commentSchema]
},
);

const PostModel = await mongoose.model('Post',postSchema);

module.exports = PostModel;