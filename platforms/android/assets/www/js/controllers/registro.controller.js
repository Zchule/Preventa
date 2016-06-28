CTRLS.controller('RegistroCtrl', function($scope, $stateParams, Clientes, $state) {

  $scope.saveCliente = saveCliente;
  
  $scope.isNew = true;
  $scope.cliente = {};

  $scope.clientes = Clientes;
  $scope.listCanSwipe = true;

  $scope.agregar = function() {

      if($scope.isNew){
        $scope.cliente.face='img/ionic.png';

                /** Se guadar en firebase */
                $scope.clientes.$add({

                  "nombre":$scope.cliente.nombre,
                  "apPat":$scope.cliente.apPat,
                  "apMat":$scope.cliente.apMat,
                  "face": $scope.cliente.face,
                  "CI":$scope.cliente.CI,
                  "nombreTienda":$scope.cliente.nombreTienda

                });
                $scope.cliente ={};
                $state.go('app.clientes');
                return $scope.cliente;


              }
              //$state.go('app.clientes');

          }



	function saveCliente(){
    if($scope.isNew){
      $scope.cliente.face='img/ionic.png';
      $scope.clientes.push( $scope.cliente );
      $scope.cliente ={};
    }
    $state.go('app.clientes');
  }
  //$scope.clientes = Clientes.all();

});
