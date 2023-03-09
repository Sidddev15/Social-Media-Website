const mongoose = require('mongoose');

//providing connection to database
mongoose.connect('mongodb://127.0.0.1/coderthon_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error conection in MongoDB"));

db.once('open', function(){
    console.log('connected to database :: MongoDB');
});

module.exports = db;
