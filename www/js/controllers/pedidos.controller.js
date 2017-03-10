CTRLS.controller('PedidosCtrl', function($scope, Pedidos, $ionicLoading, $ionicPopup, $rootScope, Clientes, $stateParams,Productos, $ionicModal, $state, $ionicActionSheet){

$scope.pedido = {};
$scope.pedidos = {};

 $scope.showOptions=showOptions;	
 
  $scope.pedidos=[];
  $scope.openModal = openModal;
  $scope.closeModal = closeModal;

  $scope.pedido = {};
  $scope.producto = {};

  $scope.productos =[];
  $scope.productos = Productos.all();

$ionicLoading.show({
    template:'Cargando...'
  });

//guardando la conexion de firebase
  $scope.pedidos = Pedidos.all();

  $scope.pedidos.$loaded().then(function (todo) {
      $ionicLoading.hide();

  });
   console.log($scope.pedidos);


  $ionicModal.fromTemplateUrl('templates/pedido-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })

  .then(function(modal){
    $scope.modal = modal;
  });
  
  function openModal(){
    // $scope.isNew = true;
    // $scope.pedido = {};
    $scope.modal.show();
  }
  /*$scope.pedido={
    nombre:"juan",
    codigo: 123,
    listaProductos:[{name:"papas", cantidad:10}, {name:"papas", cantidad:10}, {name:"papas", cantidad:10}]

  }*/
  $scope.verPedido = function(indexPedido){

    $scope.pedido = $scope.productos[indexPedido];
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

  $scope.Salir= function(){
    $scope.modal.hide();
  }

//var test = 0;
    function showOptions(indexPedido){
      console.log("index Pedido "+indexPedido);
      //test = indexProducto;
      //$rootScope.indexP= indexProducto;
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-clipboard"></i> Ver Pedido' }
      ],
      //destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
       
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          //console.log("TEST "+test);
          $scope.verPedido(indexPedido);

        }
        return true;
      }
    });
  }






});

