CTRLS.controller('ProductosPedidoCtrl', function($scope, $ionicLoading, $rootScope, Clientes ,$location, $stateParams,Productos, Pedidos, $ionicModal, $timeout, $state, $ionicPopup, $ionicActionSheet, $ionicLoading){

  $scope.showOptions=showOptions;
  $scope.loginData = {};

  $scope.pedidos=[];
  $scope.pedidos = Pedidos.all();
 
  $scope.productos =[];
  $scope.productos = Productos.all();


  $scope.openModal = openModal;
  $scope.closeModal = closeModal;

  
  $scope.pedido = {};
  $scope.producto = {};

  $ionicLoading.show({
    template: 'Cargando...'
  });

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  $ionicModal.fromTemplateUrl('templates/producto-pedido-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  })

  .then(function(modal){
    $scope.modal = modal;
  });
  
  function openModal(){
    $scope.isNew = true;
    $scope.pedido = {};
    $scope.modal.show();
  }
  /*$scope.pedido={
    nombre:"juan",
    codigo: 123,
    listaProductos:[{name:"papas", cantidad:10}, {name:"papas", cantidad:10}, {name:"papas", cantidad:10}]

  }*/

  function closeModal(){
    $scope.modal.hide();
  }

  $scope.Salir= function(){
    $scope.modal.hide();
  }

//var test = 0;
    function showOptions(indexProducto){
      console.log("index Product "+indexProducto);
      //test = indexProducto;
      //$rootScope.indexP= indexProducto;
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-clipboard"></i> Realizar Pedido' }
      ],
      //destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
       
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          //console.log("TEST "+test);
          $scope.hacerPedido(indexProducto);

        }
        return true;
      }
    });
  }
  $scope.hacerPedido = function(index){
                console.log("index" + index);
                $scope.producto = $scope.productos[index];
                $scope.modal.show();
                console.dir($scope.producto);
                $scope.productoID = $scope.producto.$id;
                $scope.productoPhoto =$scope.producto.photo;
                console.log($scope.productoID);
                console.log($scope.producto.precio);

                $scope.pedido.cantProducto = 1;
              }
$scope.isNew = true;

$scope.guardarPedido=function(cantProducto){
  // id del preventista
    console.log($scope);
    console.log($rootScope);
    var userID = $rootScope.usuarioID;
    console.log(userID); // id de preventista
    var userPreventa = $rootScope.usuarioRol;
    console.log(userPreventa); //rol del preventista
    //muestra el codigo del cliente
    
    $scope.clienteID = $rootScope.clienteID;
    $scope.pedido.cantProducto = cantProducto;
    $scope.pedido.total = parseInt($scope.pedido.cantProducto* $scope.producto.precio);

     /** Se guadar en firebddddddfase */
                $scope.pedidos.$add({
                  "idproducto": $scope.productoID,
                  "idPreventista": userID,
                  "idCliente": $scope.clienteID,
                  "photo": $scope.productoPhoto,
                  "cantidadProducto": $scope.pedido.cantProducto,
                  "total": $scope.pedido.total
                });
    $scope.pedido.total="";
    $scope.modal.hide();
    var confirmPopup = $ionicPopup.alert({
                      title: 'EXIT',
                      template: 'su pedido fue ingresado'
                       });
    $state.go("app.productosPedidos");
  };

  function savePedido(){

      if($scope.isNew){
        $scope.agregarPedido();
        console.log("nuevo");
      }else{

        $scope.pedido();
      }
    }

$scope.pedido = function (cantProducto){
    var userID = $rootScope.usuarioID;
    var userPreventa = $rootScope.usuarioRol;
    $scope.clienteID = $rootScope.clienteID;
    $scope.pedido.cantProducto = cantProducto;
    $scope.pedido.total = parseInt($scope.pedido.cantProducto* $scope.producto.precio);

    var cliente = Clientes.getRef($scope.clienteID);
     /** Se actualiza en firebase */
                cliente.update({
                  "Lista Pedidos":{
                  "idproducto":$scope.productoID,
                  "idPreventista": userID,
                  "idCliente": $scope.clienteID,
                  "photo": $scope.productoPhoto,
                  "cantidadProducto": $scope.pedido.cantProducto,
                  "total": $scope.pedido.total}    
                  
                  });
  };
  
  //filtrar po codigo de cliente
  $scope.pedidos.$loaded().then(function (todo) {

  });

  Pedidos.all().forEach(function (element){
    console.dir(element);
    console.log(element);
  });
/*
  var filtrarPedido = function(idCliente){
        var pedidosVendidos=[];
        var j=0;
       for (var i = 0; i < listaPedido.length; i++) {
                if(listaPedido[i].idCliente == idCliente){
                  listPedidos[j]=listaPedido[i];
                  j++;
                }
            }
        return pedidosVendidos;
    }


  $scope.listPedido= function(listPedidos, clienteID){
    $scope.lista = listPedidos;
    var cliente = Clientes.getRef(clienteID);
    console.log(cliente); 
    cliente.update({
                  "list": $scope.list
                });
 } */

});