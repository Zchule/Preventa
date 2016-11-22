CTRLS.controller('LoginCtrl', function($scope, $rootScope, Users, $rootScope, $stateParams, $state, $ionicPopup){
	
	$scope.data = {}; //scope: $scope
	$scope.doLogin = doLogin;
	$scope.salir = salir;

	$scope.users = [];
	$scope.users = Users.all();

	$scope.menus = 
	[[
    	{ref: "#/app/clientes/", icon: "icon ion-ios-people", titulo:"Lista de Clientes P"},
    	{ref: "#/app/registro", icon: "icon ion-person-add", titulo:"Registro"},
    	{ref: "#/app/productos", icon: "icon ion-ios-list", titulo: "Productos"},
    	{ref: "#/app/loginCliente", icon: "icon ion-ios-cart", titulo: "Hacer pedido"},
    	{ref: "#/app/listaPedidos", icon: "icon ion-ios-list", titulo: "Lista de Pedidos"}  
    	
    ],
    [
    	{ref: "#/app/clientes/", icon: "icon ion-ios-people", titulo:"Lista de Clientes D"},
    	{ref: "#/app/listaPedidos", icon: "icon ion-ios-list", titulo: "Lista de Entrega"},
    	{ref: "#/app/mapas", icon: "icon ion-map", titulo: "Mapa de Entrega"} 
    ],
    [
    	{ref: "#/app/clientes/", icon: "icon ion-ios-people", titulo:"Lista de Clientes A"},
    	{ref: "#/app/users", icon: "icon ion-ios-people", titulo: "Lista de Usuarios"},
    	{ref: "#/app/addProductos", icon: "icon ion-ios-list", titulo: "lista de Productos"}
    	 
    ]];

  //console.log($rootScope.menus);
  /*
  $scope.boton = function(){

		for (var i = 0 ; i < $scope.users.length; i++) {

		
		console.log("users: " + $scope.users[i].usuario);

		console.log($scope.users.length);
		console.log($scope.users[i]);
		console.log($scope.users[i].usuario);
		console.log($scope.users[i].contrasenia);

		}


	}*/
	$scope.mySelect = 'Administrador';
	$scope.showSelectValue = function(mySelect) {
	console.log(mySelect);
    if(mySelect == 'Preventa'){
    	$rootScope.menu = $scope.menus[0];

    	console.log($rootScope.menu);
    }else{
    	if(mySelect == 'Distribuidor'){
    		$rootScope.menu = $scope.menus[1];
    	}else
    	{
    		if(mySelect == 'Administrador'){
    		$rootScope.menu = $scope.menus[2];
    		}
    	}
    }
}
	$scope.loginUser="";

	function doLogin(){
		var filtraPorNombreUsuario = function(user){
			//console.log(user.usuario)
			//console.log($scope.data.username)
			if(user.usuario == $scope.data.username){
				return user;
			}
		}

		$scope.currentUser = $scope.users.filter(filtraPorNombreUsuario);
		$scope.logedUser = $scope.currentUser[0];
		console.log($scope.currentUser);
		console.log($scope.logedUser);

		if($scope.currentUser[0].contrasenia == $scope.data.password){
				var rol = $scope.currentUser[0].rol; //console.log(rol);

				$scope.showSelectValue(rol);

				$scope.loginUser= $scope.logedUser.usuario;
				
				$state.go('app.clientes', {User:$scope.loginUser});

				/*console.log($rootScope.menu);

				var x = $rootScope.menu[0];
    			console.log(x);
    			console.log(x.ref);
    			x.ref = x.ref+$scope.loginUser;

    			$rootScope.menu[0]= x;*/

    			$rootScope.usuarioRol = rol;
    			$rootScope.usuarioID = $scope.currentUser[0].$id;
    			console.log($rootScope.usuarioID);

				$scope.data.username="";
				$scope.data.password="";
				
			
		}else
		{	
			var confirmPopup = $ionicPopup.confirm({
     			title: 'Los datos son invalidos',
     			template: 'Revise los datos ingresados'
				});
			
		}
	}

	function salir(){

		//if(window.navigator.app){navigator.app.exitApp();}
		//else if(window.navigator.device){navigator.device.exitApp();}
		//.log("Salir");
		ionic.Platform.exitApp();
	}
});