SERVICES.factory('Productos', ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject) {

    return {
        //retorna la referencia a la base de datos 'todos'
        allRef: function() {
            return firebase.database().ref('productos');
        },
        //La referencia la retorna como un array de firebase
        all: function() {
            return $firebaseArray(this.allRef());
        },
        //retorna la referencia  a un objeto 'todo'
        getRef: function(id) {
            return firebase.database().ref('productos/' + id);
        },
        //La referencia la retorna como un objeto de firebase
        get: function(id) {
            return $firebaseObject(this.getRef(id));
        }
    }
}]);