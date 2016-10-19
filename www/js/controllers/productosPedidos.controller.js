CTRLS.controller('ProductosPedidoCtrl', function($scope, $rootScope, $location, $stateParams,Productos, Pedidos, $ionicModal, $timeout, $state, $ionicPopup, $ionicActionSheet, $ionicLoading){

  $scope.showOptions=showOptions;

  $scope.loginData = {};

  // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/loginCliente.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };*/

  // Perform the login action when the user submits the login form

  console.log($rootScope.menu);
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);


    if($scope.loginData.username == "b" && $scope.loginData.password == "123"){

        $state.go('app.productosPedidos',{cliente: $scope.loginData.username});

        console.log($rootScope.menu);

        $scope.loginData.username="";
         $scope.loginData.password="";

      
    }else
    {
      var confirmPopup = $ionicPopup.confirm({
          title: 'Los datos son invalidos',
          template: 'Revise los datos ingresados'
      });

      $scope.modal.show();
    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    /*$timeout(function() {
      $scope.closeLogin();
    }, 1000);*/
  };

  $scope.producto = {};

  $ionicLoading.show({
    template: 'Cargando...'
  });

    $scope.productos = Productos;

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });


  $ionicModal.fromTemplateUrl('templates/producto-pedido-modal.html', {
    scope: $scope
  })

  .then(function(modal2){
    $scope.modal2 = modal2;
  });

  $scope.openModal = openModal;
  $scope.closeModal = closeModal;
  $scope.hacerPedido=hacerPedido;

  function openModal(){
    $scope.isNew = true;
    $scope.pedido = {};
    $scope.modal2.show();
  }

  $scope.pedidos = Pedidos;
  $scope.pedido = {};

  function closeModal(producto, pedido){
   $scope.producto.precio = producto.precio;
    $scope.pedido.total = parseInt($scope.producto.precio*pedido.cantProducto);
    console.log($scope.pedido.total);

    /** Se guadar en firebase */
                $scope.pedidos.$add({
                  
                  "id": producto.$id,
                  "foto": producto.face,
                  "precio":producto.precio,
                  "cantidadProducto":pedido.cantProducto,
                  "total": $scope.pedido.total
                });

    $scope.modal2.hide();
    $state.go("productos");
    //$location.url('app.productosPedidos');
  // $scope.$apply();
   //$route.reload();
  }

  $scope.Salir=Salir;

  function Salir(){

    $scope.modal2.hide();

  }

    function showOptions(indexProducto){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-clipboard"></i> hacer Pedido' }
      ],
      //destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          $scope.hacerPedido( indexProducto );
        }
        return true;
      }
    });
  }

  function hacerPedido(index){
    //agarrar idpreventa, id cliente, 

    //agarrar el idproducto iijoprecio, la cantidad de pedido

                $scope.producto = $scope.productos[index];
                $scope.modal2.show();
                console.log($stateParams.cliente); 
                $scope.pedido.cantProducto = 1;
                //$scope.modal.hide();  
                //return $scope.productos; 

              }
});