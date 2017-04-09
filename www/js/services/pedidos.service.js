SERVICES.factory('Pedidos', function($firebaseArray, $firebaseObject) {

    return {
        //retorna la referencia a la base de datos 'todos'
        allRef: function() {
            return firebase.database().ref('pedidos');
        },
        //La referencia la retorna como un array de firebase
        all: function() {
            return $firebaseArray(this.allRef());
        },
        //retorna la referencia  a un objeto 'todo'
        getRef: function(id) {
            return firebase.database().ref('pedidos/' + id);
        },
        //La referencia la retorna como un objeto de firebase
        get: function(id) {
            return $firebaseObject(this.getRef(id));
        }
    };

    // 'https://bddproyecto.firebaseio.com/pedidos/$uid
    ///users/$uid/groups/$group_id

    //var Ref = new Firebase("https://bddproyecto.firebaseio.com/pedidos");
    //Ref.limitToLast ( 20 );
    //return $firebaseArray(bdbRef);
});