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