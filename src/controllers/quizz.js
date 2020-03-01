

exports.getIndex = (req, res, next) => {
    res.render('index.ejs');
}

exports.getQuizz = (req, res, next) => {
    res.render('form/quizz', {username: req.session.user.name});
};