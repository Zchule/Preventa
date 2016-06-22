CTRLS.controller('RegistroCtrl', function($scope, $stateParams, Clientes, $state) {

  $scope.saveCliente = saveCliente;
  
  $scope.isNew = true;
  $scope.cliente = {};



	function saveCliente(){
    if($scope.isNew){
      $scope.cliente.face='img/ionic.png';
      $scope.clientes.push( $scope.cliente );
      $scope.cliente ={};
    }
    $state.go('app.clientes');
  }
  $scope.clientes = Clientes.all();

});
