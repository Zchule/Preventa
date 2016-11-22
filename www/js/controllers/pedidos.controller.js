CTRLS.controller('PedidosCtrl', function($scope, Pedidos, $ionicLoading, $ionicPopup){

$scope.pedido = {};
$scope.pedidos = {};

$ionicLoading.show({
    template:'Cargando...'
  });

//guardando la conexion de firebase
  $scope.pedidos = Pedidos.all();

  $scope.pedidos.$loaded().then(function (todo) {
      $ionicLoading.hide();

  });
   console.log($scope.pedidos);

});

