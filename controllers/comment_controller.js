const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = async function(req, res){

    const isPost = await Post.findById(req.body.post);

    if (isPost) {
        const commentNew = await Comment.create({
            comment: req.body.comment,
            post: req.body.post,
            user: req.user._id,
        });

        console.log(commentNew)
        isPost.comments.push(commentNew);
        isPost.save();

        return res.redirect('/');
    }

}

module.exports.destroy = async function(req, res){

    var comment = await Comment.findById(req.params.id);

    if(comment.user == req.user.id){

        var postId = comment.post;

        await Comment.deleteOne({_id: req.params.id});
        await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}})
        return res.redirect('back');

    }else{
        return res.redirect('back');
    }

}