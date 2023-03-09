const Comment = require('../models/comment');
const Post = require('../models/post');



module.exports.create = function(req,res){
    Post.findById(req.body.post, function(err, post){
        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                if (err){console.log('Error in creating the comment'); return;}


                post.comments.push(comment); //updating 'push' is a mondodb method
                post.save(); //saves it in the database

                res.redirect('back');
            });
            
        }
    });
}

module.exports.destroy = async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId=comment.post;
            comment.remove();
            let post=Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }

    }
    catch(err){
        console.log("Error ",err);
    }
    
}