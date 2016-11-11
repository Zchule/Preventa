CTRLS.controller('ProductosPedidoCtrl', function($scope, $ionicLoading, $rootScope, Clientes ,$location, $stateParams,Productos, Pedidos, $ionicModal, $timeout, $state, $ionicPopup, $ionicActionSheet, $ionicLoading){

  $scope.showOptions=showOptions;
  $scope.loginData = {};

  $scope.clientes =[];
  $scope.clientes = Clientes.all();

  $scope.pedidos=[];
  $scope.pedidos = Pedidos.all();
 
  $scope.productos =[];
  $scope.productos = Productos.all();


  $scope.openModal = openModal;
  $scope.closeModal = closeModal;

  $scope.doLogin = function() {

      var filtraPorCodigo = function(cliente){
      //console.log(user.usuario)
      //console.log($scope.data.username)
      if(cliente.codigo == $scope.loginData.username){
        return cliente;
      }

    }

    $scope.currentCliente = $scope.clientes.filter(filtraPorCodigo);
    $scope.logedCliente = $scope.currentCliente[0];
    console.log($scope.currentCliente);
    console.log($scope.logedCliente); //datos del cliente
   
    //console.log('Doing login', $scope.loginData);

    //$scope.currentUser[0].contrasenia == $scope.data.password
    if($scope.currentCliente[0].password == $scope.loginData.password){

        $scope.loginCliente= $scope.logedCliente.codigo;
        $scope.keyCliente = $scope.currentCliente[0].$id;
        console.log($scope.keyCliente);
        $state.go('app.productosPedidos',{cliente: $scope.loginCliente});
       
        $scope.loginData.username="";
        $scope.loginData.password="";
          console.log($scope.keyCliente);
      
    }else
    {
      var confirmPopup = $ionicPopup.confirm({
          title: 'Los datos son invalidos',
          template: 'Revise los datos ingresados'
      });
      $timeout(function() {
         confirmPopup.close(); //close the popup after 3 seconds for some reason
       }, 3000);
      //$scope.modal.show();
    }
  };
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

  .then(function(modal2){
    $scope.modal2 = modal2;
  });
  
  function openModal(){
    $scope.isNew = true;
    $scope.pedido = {};
    $scope.modal2.show();
  }
  /*$scope.pedido={
    nombre:"juan",
    codigo: 123,
    listaProductos:[{name:"papas", cantidad:10}, {name:"papas", cantidad:10}, {name:"papas", cantidad:10}]

  }*/

  function closeModal(){
    $scope.modal2.hide();
  }

  $scope.Salir= function(){
    $scope.modal2.hide();
  }

//var test = 0;
    function showOptions(indexProducto){
      console.log("index Product "+indexProducto);
      //test = indexProducto;
      //$rootScope.indexP= indexProducto;
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-clipboard"></i> hacer Pedido' }
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
                $scope.modal2.show();
                console.dir($scope.producto);
                $scope.productoID = $scope.producto.$id;
                console.log($scope.productoID);
                console.log($scope.producto.precio);

                $scope.pedido.cantProducto = 1;
              }

$scope.guardarPedido=function(cantProducto){
  // id del preventista
    console.log($scope);
    console.log($rootScope);
    var userID = $rootScope.usuarioID;
    console.log(userID); // id de preventista
    var userPreventa = $rootScope.usuarioRol;
    console.log(userPreventa); //rol del preventista
    //muestra el codigo del cliente
    
    //$scope.clienteID = $scope.keyCliente;
    //console.log($scope.keyCliente); 

    console.log($scope.productoID);
    $scope.pedido.cantProducto = cantProducto;
    console.log($scope.pedido.cantProducto);
    console.log($scope.producto.precio);
    $scope.pedido.total = parseInt($scope.pedido.cantProducto* $scope.producto.precio);
    $scope.keys = [];
    console.log($scope.pedido.total);

     /** Se guadar en firebddddddfase */
                $scope.pedidos.$add({
                  "idproducto": $scope.producto.codigo,
                  "idPreventista": userID,
                  //"idCliente": $scope.keyCliente,
                  "cantidadProducto": $scope.pedido.cantProducto,
                  "total": $scope.pedido.total
                }).then(function(firebaseRef) {
                  var id = firebaseRef.key();
                    console.log(id);
                    $scope.keys.push(id);
                    var confirmPopup = $ionicPopup.alert({
                      title: 'EXIT',
                      template: 'su pedido fue ingresado'
                       });
                  
                });
    console.log($scope.keys);
    $scope.pedido.total="";
    $scope.modal2.hide();
    $state.go("app.productosPedidos");
  };
/*
  function filtrarPedidos(){
    var pedidosVendidos = [];
    var j =0;
    var  lista = $scope.pedidos;
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].idPreventista == userID) {
        pedidos[j] = lista[i];
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