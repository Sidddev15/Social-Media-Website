const User = require('../models/user');

module.exports.profile = function(req,res){
    console.log(req.params.id)
    User.findById(req.params.id, function(err, user){
        return res.render('users',{
            title: "Users",
            profile_user: user
        });
    });
    
}
//update
module.exports.update = function(req,res){
    if (req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back')
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}


//action
//Render the sign up page
module.exports.signUp = (req, res) =>{

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Coderthon | Sign Up"
    })
}
//Render the sign in page
module.exports.signIn = (req, res) =>{

    if (req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('user_sign_in', {
        title: "Coderthon | Sign In"
    })
}

//get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }

    });
}
// Sign in and create a session for the user
module.exports.createSession = (req,res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req,res,next) =>{
    req.logout(function(err){
        if(err){
            return next(err);
        }

        return res.redirect('/');
    }); //this function is given by passport

    
}