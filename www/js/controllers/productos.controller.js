CTRLS.controller('ProductosCtrl', function($scope, Productos, $ionicLoading) {
  
  $ionicLoading.show({
    template: 'Cargando...'
  });

    $scope.productos = Productos;

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

    function productoID( index){  

    console.log($scope.productos[index]);
    //$scope.clientes.splice( index, 1 );

  }
  
});