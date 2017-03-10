CTRLS.controller('loginClienteCtrl', function($scope, Clientes, $ionicLoading, $rootScope,  $timeout, $state, $ionicPopup){

	$scope.clientes =[];
  	$scope.clientes = Clientes.all();

  	$scope.doLogin = function() {
      console.log($scope.loginData.username);
      console.log($scope.loginData.password);


      for (var i = 0; i < $scope.clientes.length; i++) {
        console.log($scope.clientes[i].codigo);
        console.log($scope.clientes[i].password);

        if($scope.loginData.username== $scope.clientes[i].codigo && $scope.loginData.password == $scope.clientes[i].password)
        {

          $rootScope.clienteID = $scope.clientes[i].codigo;
          $rootScope.userCodigo = $rootScope.usuarioID;
          console.log($rootScope.userCodigo); 
           console.log($rootScope.clienteID);

           $state.go('app.productosPedidos',{cliente: $scope.clienteID});
           $scope.loginData.username="";
           $scope.loginData.password="";
           // $scope.ingresar=true;
           confirmPopup.close();

           
        }

      }

        
          console.log("no encontrado");
          var confirmPopup = $ionicPopup.confirm({
            title: 'Los datos son invalidos',
            template: 'Revise los datos ingresados'
          });

        $scope.loginData.username="";
        $scope.loginData.password="";

  //     var filtraPorCodigo = function(cliente){
  //     
  //     if(cliente.codigo == $scope.loginData.username){
  //       return cliente;
  //     }
  //       // console.log("no encontrado");
  //       // var confirmPopup = $ionicPopup.confirm({
  //       //   title: 'Los datos son invalidos',
  //       //   template: 'Revise los datos ingresados'
  //       // })
  //   }

  //   $scope.currentCliente = $scope.clientes.filter(filtraPorCodigo);
  //   $scope.logedCliente = $scope.currentCliente[0];
  //   console.log($scope.currentCliente);
  //   console.log($scope.logedCliente); //datos del cliente
   
  //   //console.log('Doing login', $scope.loginData);

  //   //$scope.currentUser[0].contrasenia == $scope.data.password
  //   if($scope.currentCliente[0].password == $scope.loginData.password){

  //       $scope.loginCliente= $scope.logedCliente.codigo;
  //       $rootScope.clienteID = $scope.currentCliente[0].$id;
  //       console.log($rootScope.clienteID);
  //       $state.go('app.productosPedidos',{cliente: $scope.loginCliente});
       
  //       $scope.loginData.username="";
  //       $scope.loginData.password="";
      
  //   }else
  //   {
  //     var confirmPopup = $ionicPopup.confirm({
  //         title: 'Los datos son invalidos',
  //         template: 'Revise los datos ingresados'
  //     });
  //     $timeout(function() {
  //        confirmPopup.close(); //close the popup after 3 seconds for some reason
  //      }, 3000);
  //     //$scope.modal.show();
  //   }
  }

});