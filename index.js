const express = require('express');
const app = express();
const port = 8000;
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');
// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const mongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));



app.use(express.urlencoded({extended: true}))



//Cookie Parser
app.use(cookieParser());

//Accessing the layout folder
app.use(expressLayout);

//accessing static 
app.use(express.static('./assets'));
//extract styles and scripts for layout
app.set('layout extraStyles', true);
app.set('layout extractScript', true);

//Mongostore is used to store session cookies in db


//Middleware takes the sessions and encrypts it
app.use(session({
    name: 'Coderthon',
    //TODO change the secret in the production mod
    secret: 'ASocialMediaWebsite',
    resave: false,   //when the identity is establish, it is stored do i want to rewrite it do i want to save the same thing again and again
    saveUninitialized: false,       //Do i want to store extra data for the user when the user is not present available
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: new mongoStore (
        {
        mongooseConnection : db,
        autoRemove: 'disabled'
        },
        (err) =>{
            console.log(err || 'Connect MongoDB setup okay');
        }
        
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//use express router
app.use(require('./Routes'));
//use express routers
app.use('/' , require('./Routes/index'));

app.set('view engine','ejs');
app.set('views', './views');

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});




module.exports = app;