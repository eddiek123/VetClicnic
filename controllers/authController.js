// Authentication controller
const db = require('../models');
const passwordHash = require('password-hash');

module.exports = {

  signIn: function (req, res, next) {
    const user = req.body;
    // Find-one
    db.User.findOne({ username: user.username })
      .then(dbuser => {
        // Does password matches?
        if (user !== null && passwordHash.verify(user.password, dbuser.password)) {
          req.login(dbuser, () => {
            return res.json(dbuser);
          });
        } else {
          return res.json('');
        }
      })
      .catch(e => console.error(e));
  },
  signOut: function (req, res) {
    req.logout();
    return res.json('');
  },
  getSessionUser: function (req, res) {
    console.log('controller-getSessionUser');
    let sessionUser = '';
    if (req.user !== undefined) {
      sessionUser = req.user;
    }
    return res.json(sessionUser);
  }

};
