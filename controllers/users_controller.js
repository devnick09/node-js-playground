const { response } = require('express');
const User = require('../models/users')

module.exports.userProfile = async function(req, res){
    var user = await User.findById(req.params.id);
    if(user){
        return res.render('users', {
            title: "Users",
            profile_user: user
        });
    }
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect('back');
    }else{
        res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Sign Up",
    });
}

module.exports.signIn = function(req, res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Sign In",
    });
}

module.exports.createUser =async function(req, res){
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }

    let matchingUser = await User.findOne({email : req.body.email});

    if (matchingUser != null) {
        console.log("Email is already existing in DB");
        return res.redirect('back');
    }else{
        // crating new User and storing into DB
        User.create(req.body);
        return res.redirect('/users/sign-in');
    }
}
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){

    req.logout(function(){
        console.log("User Logged Out");
    });

    return res.redirect('/');
}