SERVICES.factory('BdDproyecto', function($firebaseArray) {
    var bdbRef = firebase.database().ref('productos');
    return $firebaseArray(bdbRef);
    // return $firebaseObject(bdbRef);
});