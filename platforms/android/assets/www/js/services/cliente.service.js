SERVICES.factory('Clientes', ['$firebaseArray','$firebaseObject', function($firebaseArray, $firebaseObject) {
  
	return {
      //retorna la referencia a la base de datos 'todos'
      allRef: function(){
        return new Firebase('https://bddproyecto.firebaseio.com/clientes');
      },
      //La referencia la retorna como un array de firebase
      all: function(){
        return $firebaseArray(this.allRef());
      },
      //retorna la referencia  a un objeto 'todo'
      getRef: function(id){
        return new Firebase('https://bddproyecto.firebaseio.com/clientes/' + id);
      },
      //La referencia la retorna como un objeto de firebase
      get: function(id){
        return $firebaseObject(this.getRef(id));
      }
    };

  //var bdbRef = new Firebase("https://bddproyecto.firebaseio.com/clientes");
  //return $firebaseArray(bdbRef);
  }
]);
