

exports.getQuizz = (req, res, next) => {
    res.render('form/quizz', {username: req.session.user.name});
};