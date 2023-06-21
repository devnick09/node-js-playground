module.exports.home = function(req, res){
    console.log(req.cookies)
    res.cookie('user_id', 9999);
    return res.render('home', {
        title: 'Home',
    });
}