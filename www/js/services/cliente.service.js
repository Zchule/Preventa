SERVICES.factory('Clientes', function($firebaseArray) {
  var bdbRef = new Firebase("https://bddproyecto.firebaseio.com/clientes");
  return $firebaseArray(bdbRef);
});
