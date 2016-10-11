SERVICES.factory('Users', ['$firebaseArray','$firebaseObject', function($firebaseArray, $firebaseObject) {
  
return {
      //retorna la referencia a la base de datos 'todos'
      allRef: function(){
        return new Firebase('https://bddproyecto.firebaseio.com/users');
      },
      //La referencia la retorna como un array de firebase
      all: function(){
        return $firebaseArray(this.allRef());
      },
      //retorna la referencia  a un objeto 'todo'
      getRef: function(id){
        return new Firebase('https://bddproyecto.firebaseio.com/users/' + id);
      },
      //La referencia la retorna como un objeto de firebase
      get: function(id){
        return $firebaseObject(this.getRef(id));
      }
    }

  /*return {

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
  }; */
}
]);
