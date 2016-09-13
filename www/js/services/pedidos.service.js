SERVICES.factory('Pedidos', function($firebaseArray) {
  var bdbRef = new Firebase("https://bddproyecto.firebaseio.com/pedidos");
  return $firebaseArray(bdbRef);
});