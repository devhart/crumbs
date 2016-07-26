const User = require('./user.model');

module.exports = {
  validateUserLogin: ({username, password}, socket) => {
    User.findOne({ username }, (err, userData) => {
      var user = false;
      if (userData) {
        user = userData.password === password ? username : false;
      }
      socket.emit('Authentication', user);
    });
  },

  validateUserSignup: ({username, password}, socket) => {
    User.findOne({ username }, (err, userData) => {
      if (userData) {
        socket.emit('Authentication', false);
      } else {
        User.create({
          username,
          password,
        }).then(() => {
          socket.emit('Authentication', username);
        }).catch((err) => {
          console.log('Failed to create User Data', err);
        });
      }
    });
  },
};
