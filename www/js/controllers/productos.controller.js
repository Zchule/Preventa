CTRLS.controller('ProductosCtrl', function($scope, Productos, $ionicLoading) {
  
  $ionicLoading.show({
    template: 'Cargando...'
  });

    $scope.productos = Productos;

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

});