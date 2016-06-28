SERVICES.factory('Productos', function($firebaseArray) {
  
  var bdbRef = new Firebase("https://bddproyecto.firebaseio.com/productos");
  return $firebaseArray(bdbRef);
});
  
