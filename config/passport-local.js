const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new LocalStrategy({
        usernameField: 'email'
    }, 
    async function(email, password, done) {
        let matchingUser = await User.findOne({email : email});

        if (!matchingUser || matchingUser.password != password) {
            console.log('Invalid username/password');
            return done(null, false);
        }

        return done(null, matchingUser);
    }

));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);
})


// deserializing the user from the key in the cookie
passport.deserializeUser(async function(id, done) {
    let matchingUser = await User.findById(id);

    if (!matchingUser) {
        console.log('user not found');
        return done(null, false);
    }

    return done(null, matchingUser);
});

passport.checkAuthentication = function(req, res, next) {
    // if user is signed in, then pass on the request to the next fucntion(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;