const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config");

// sign up
module.exports.postSignUp = (req, res, next) => {
  console.log(req.body);
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  const artistType = req.body.artistType;
  const preferredProjs = req.body.preferredProjs;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((user) => {
      if (!user) {
        User.create({
          firstname: firstname,
          lastname: lastname,
          email: email,
          hash: password,
          artistType: artistType,
          projectTypes: preferredProjs,
        })
          .then((response) => {
            res.json({
              response,
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.json({
          msg: "User already exists!",
        });
      }
    })
    .catch((err) => console.log(err));
};

// sign in
module.exports.postSignIn = (req, res, next) => {
  const email = req.body.email.toLowerCase();
  const password = req.body.password;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then(function (user, err) {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: "Internal error please try again",
          auth: false,
        });
      } else if (!user) {
        res.status(401).json({
          error: "User email does not exist",
          auth: false,
        });
      } else {
        user.authenticate(password, function (err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again",
              auth: false,
            });
          } else if (!same) {
            res.status(401).json({
              error: "That password is incorrect",
              auth: false,
            });
          } else {
            const token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: "1h",
            });
            res.json({
              token: token,
              expiresIn: 3600,
              msg: "Welcome!",
              user: user,
              error: false,
              auth: true,
            });
          }
        });
      }
    })
    .catch((err) => console.log(err));
};

// check token
module.exports.checkToken = (req, res, next) => {
  let token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ msg: "Must pass token" });
  }
  // Check token that was passed by decoding token using secret
  jwt.verify(token, config.secret, function (err, user) {
    if (err) throw err;
    //return user using the id from w/in JWTToken
    User.findByPk(user.id)
      .then((user) => {
        res.json({
          user: user,
          token: token,
        });
      })
      .catch((err) => console.log(err));
  });
};

// signout
module.exports.signOut = (req, res, next) => {
  req.user = null;
  res.json({
    token: null,
    msg: "Logged out!",
    auth: false,
    user: null,
  });
};

// get account info
module.exports.getAccount = (req, res, next) => {};

// update account info
module.exports.postAccount = (req, res, next) => {};
