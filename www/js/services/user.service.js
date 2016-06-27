SERVICES.factory('UsersService', function() {
  var users = [{
    id: 0,
    username: 'a',
    password: 'a'
    //face: 'img/ben.png'
  }, {
    id: 1,
    username: 'b',
    password: 'b'
    //face: 'img/max.png'
  }, {
    id: 2,
    username: 'c',
    password: 'c'
    //face: 'img/adam.jpg'
  }, {
    id: 3,
    username: 'd',
    password: 'd',
    //face: 'img/perry.png'
  }, {
    id: 4,
    username: 'e',
    password: 'e',
    //face: 'img/mike.png'
  }];

  return {
    all: function() {
      return users;
    },
    remove: function(user) {
      users.splice(users.indexOf(user), 1);
    },
    get: function(userId) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].id === parseInt(userId)) {
          return users[i];
        }
      }
      return null;
    }
  };
});
