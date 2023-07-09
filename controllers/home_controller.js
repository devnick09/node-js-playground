const Post = require('../models/post')
const User = require('../models/users')

module.exports.home = async function(req, res){
    
    const allPost = await Post.find({})
        .populate('user')
        .populate({path:'comments', populate:{path: 'user'}})
        .exec();

    const allUser = await User.find({});

    if (allPost) {
        return res.render('home', {
            title: 'Home',
            posts: allPost,
            allUsers: allUser
        });
    }
}