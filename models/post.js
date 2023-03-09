const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'  //refering to the user's schema
    },
    //include the array of ids of all the comments of the post schema itself
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});


const Post = mongoose.model('Post', postSchema); //telling that it is a model in database   
module.exports = Post;