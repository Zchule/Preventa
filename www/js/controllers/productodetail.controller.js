CTRLS.controller('ProductoDetailCtrl', function($scope, $stateParams, Productos) {

  $scope.productos = Productos;
  $scope.producto = Productos.get($stateParams.productoId);
  
});