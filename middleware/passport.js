const passport = require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User} = require('../models');
const md5 = require('md5');

/**
 * Define our Local Strategy
 *
 * @api public
 */
passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        // this function is called on authenticate to test if the user's credentials are valid
        async function (username, password, done) {

            try {
                //fetch user from database
                const user = await User.findOne({
                    where: {
                        email: username
                    }
                });

                //if no user, or passwords do not match, call done with a failure message
                if (!user || md5(password) !== user.password) {
                    return done(null, false, {message: 'Incorrect email or password.', otherStuff: '123'});
                }

                //passed authentication, so user passes
                return done(false, {
                    id: user.id,
                });
            }
            catch(error){
                console.log( {
                    error,
                })
            }
        }
    )
);

//turn user object into an object that can be passed into a cookie
passport.serializeUser(function (user, done) {
    process.nextTick(function () {
        console.log({message: 'serializeUser', user});
        done(null, {id: user.id, username: user.email, displayName: user.displayName});
    });
});

//turn  serialized object back into an object.  in our case, we don't need to do anything.
passport.deserializeUser(async function (user, done) {

    const userModel = await User.findByPk(user.id,{
        include:[
            'student',
        ],
    });

    process.nextTick(function () {
        return done(null, userModel);
    });
});


module.exports.passport = passport;

