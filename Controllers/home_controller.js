// const { post } = require('..');
// const { populate } = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');

//created a controller
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookies('user_id', 25);

    // post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title: "Coderthon | Home",
    //         posts: posts
    //     });

    // });
//finding user of all post and populating user of each post and after that callback
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){
        console.log(posts[0]);
        User.find({}, function(err, users){
            return res.render('home', {
                title: "Coderthon | Home",
                posts: posts,
                all_users: users
            })
        })

        console.log(posts)
        if(err){
            console.log(err);
        }
        
    });

}