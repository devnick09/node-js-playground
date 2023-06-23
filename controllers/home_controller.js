module.exports.home = function(req, res){
    // console.log(req.cookies.user_id)
    // res.cookie('user_id', 9999);
    return res.render('home', {
        title: 'Home',
    });
}