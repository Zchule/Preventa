CTRLS.controller('ProductoDetailCtrl', function($scope, $stateParams, Productos) {
  $scope.producto = Productos.get($stateParams.productoId);
});