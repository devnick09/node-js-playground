const Post = require('../models/post');
const Comment = require('../models/comment');
const { request } = require('express');

module.exports.create = function(req, res){
    // console.log(req.user);
    Post.create({
        content: req.body.content,
        user: req.user._id
    });

    return res.redirect('/');
}

module.exports.destroy = async function(req, res){
    var post = await Post.findById(req.params.id);

    // .id means converting the object id to a string
    if(post.user == req.user.id){
        await Post.deleteOne({_id: req.params.id});
        await Comment.deleteMany({post: req.params.id})
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }
}