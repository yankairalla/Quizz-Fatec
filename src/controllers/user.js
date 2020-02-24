
const User = require('../models/user');

exports.getFormUser = async (req, res, next) => {
    const user = await User.find();
    // console.log(user);
    res.render('form/user');
};

exports.postFormUser = async (req, res, next) => {
    const { name, age, sex } = req.body
    try {
        const user = new User({ name, age, sex}); 
        await user.save();
    } catch (e) {
        console.log(e.message);
    }

    res.redirect('/');
}