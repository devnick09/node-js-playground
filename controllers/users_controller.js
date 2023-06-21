const User = require('../models/users')

module.exports.users = function(req, res){
    return res.render('users', {
        title: "Users",
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: "Sign Up",
    });
}

module.exports.signIn = function(req, res){
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
    // get the user
}