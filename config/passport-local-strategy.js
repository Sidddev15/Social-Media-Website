const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    //callback 
    function(email,password,done){
        //find the user and establish the identity
        User.findOne({email:email}, function(err,user) {
            if (err){
                console.log('Error in finding the user ---> Passport');
                return done(err);
            }
            //user not found or password didn't match
            if (!user || user.password != password) {
                console.log('Invalid Username Or Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

//Serialize User function and deserialize user function
//Serializing the user to decide which keys is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user);
})

//deserializing the user from the key in the cookie
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if (err){
            console.log('Error in finding the user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});

//check if the user is authenticated
passport.checkAuthentication = (req,res,next) => {
    
    //if the user is signed in then pass the data into the next function (controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = (req,res,next) => {
    if (req.isAuthenticated()) {
        //req.user contains the current signed-in user is from the session cookie and we are not sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;