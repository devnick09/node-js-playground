const Post = require('../models/post')

module.exports.home = async function(req, res){
    
    const allPost = await Post.find({}).populate('user').exec();

    if (allPost) {
        return res.render('home', {
            title: 'Home',
            posts: allPost
        });
    }
}