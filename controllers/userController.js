const md5 = require('md5');
const {Student, Staff, User} = require('../models');
const passport = require('passport')

module.exports.showStudentRegistrationForm = (req, res) => {
    res.render('users/registerStudent')
}

module.exports.registerStudent = async (req, res) => {

    try {
        const user = await User.create({
            email: req.body.email,
            password: md5(req.body.password),
            role: 'student'
        });

        console.log({
            user
        });

        const student = await Student.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            grade_level: req.body.grade_level,
            user_id: user.id,
        });

    } catch (error) {
        console.log('there was an error')
        console.log({
            error
        })
        res.send(error);
        return;
    }

    res.redirect('/login');
}

module.exports.showLoginForm = (req, res) => {

    const errors = req.session.messages || [];

    res.render('users/login', {
        errors
    });
}


module.exports.showStaffRegistrationForm = (req, res) => {
    res.render('users/registerStaff')
}

module.exports.registerStaff = async (req, res) => {

    try {
        const user = await User.create({
            email: req.body.email,
            password: md5(req.body.password),
            role: 'admin'
        });

        await Staff.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_id: user.id,
        });

    } catch (error) {
        console.log('there was an error')
        console.log({
            error
        })
        res.send(error);
        return;
    }

    res.redirect('/login');
}


module.exports.loginUser = passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
});


module.exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
