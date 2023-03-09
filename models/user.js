const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type : String,
        requested: true,
        unique : true
    },
    password: {
        type : String,
        requried: true
    },
    name: {
        type : String,
        requried: true
    }
}, {
    timestamps:true            //created at deleted at submitted at will be handled here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
