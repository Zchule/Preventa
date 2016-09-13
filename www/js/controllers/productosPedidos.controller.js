CTRLS.controller('ProductosPedidoCtrl', function($scope, Productos, Pedidos, $ionicModal, $timeout, $state, $ionicPopup, $ionicActionSheet, $ionicLoading){

  $scope.showOptions=showOptions;

  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/loginCliente.html', {
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
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);


    if($scope.loginData.username == "b" && $scope.loginData.password == "123"){

        $state.go('app.productosPedidos');

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
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
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

  function closeModal(){
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

  $scope.pedidos = Pedidos;
  $scope.pedido = {};

  $scope.calcular=calcular;

  function calcular(){

      console.log("calcular");
      console.log($scope.pedido.cantidadProducto);


  }

  function hacerPedido(index){

                $scope.producto = $scope.productos[index];
                $scope.modal2.show();

                $scope.pedido.cantidadProducto = 1;
                //$scope.total =($scope.producto.precio*$scope.cantidadProducto);
                //console.log($scope.total);
    
                /** Se guadar en firebase */
                $scope.pedidos.$add({
                  
                  "name":$scope.producto.name,
                  "cantidad":$scope.producto.cantidad,
                  "precio":$scope.producto.precio,
                  "cantidadProducto":$scope.pedido.cantidadProducto
                });

                $scope.modal.hide();                
              }
    //$scope.modal.hide();
    //$scope.total = ($scope.producto.precio * $scope.cantidadProducto);
    //console.log($scope.total);

});