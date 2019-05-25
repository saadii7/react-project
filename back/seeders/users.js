const bcrypt = require('bcryptjs');

const User = require('../models/User');
module.exports = apply = async () => {
  let user = await User.find({ email: 'admin@gameon.com', isAdmin: true });
  console.log('user', user);
  if (user.length == 0) {
    const newUser = new User({
      name: 'Admin',
      email: 'admin@gameon.com',
      password: '12345678',
      userName: 'RealBuddy',
      isAdmin: true,
      avatar: ''
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error('There was an error', err);
      else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.error('There was an error', err);
          else {
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                return;
              })
              .catch(e => console.log(e));
          }
        });
      }
    });
  }
};
// apply();
