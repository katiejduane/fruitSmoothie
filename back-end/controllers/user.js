const User = require('../models/user');

module.exports.getAccount = (req, res, next) => {

}

// module.exports.getSignIn = (req, res, next) => {

// }

module.exports.postSignIn = (req, res, next) => {
    
}

module.exports.getSignUp = (req, res, next) => {

}

module.exports.postSignUp = (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    User.create({
        email: email,
        hash: password
    })
    .then(response => {
        res.json(response)
    })
    .catch(err => console.log(err))
}

module.exports.postAccount = (req, res, next) => {

}