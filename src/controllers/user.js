
const User = require('../models/user');



exports.getFormUser = async (req, res, next) => {
    if(req.session.user) {
        console.log(req.session.user);
    } else {
        console.log('Olá estranho!');
    }
    res.render('form/user');
};

exports.postFormUser = async (req, res, next) => {
    const { name, age, sex } = req.body
    req.session.user = { name, age, sex };

    res.redirect('/');
}