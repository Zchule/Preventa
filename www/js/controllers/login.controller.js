CTRLS.controller('LoginCtrl', function($scope, $rootScope, Users, $rootScope, $stateParams, $state, $ionicPopup){
	
	$scope.data = {};
	//scope: $scope
	$scope.doLogin = doLogin;
	$scope.salir = salir;

	$scope.users = [];
	$scope.users = Users.all();

	console.log($scope.users);
	console.log($scope.users[0]);

	/*$scope.boton = function(){

		for (var i = 0 ; i < $scope.users.length; i++) {

			console.log(" users: " + $scope.users[i].nombre);

		}

		console.log($scope.users.length);
		console.log($scope.users[0]);
		console.log($scope.users[0].nombre);

	}*/

	//$scope.menus=[];
	// $scope.menus = [
 //    {title:"Preventa", ref :["#/app/registro", "#/app/clientes", "#/app/productos", "#/app/loginCliente"], icon:["icon ion-person-add", "icon ion-ios-people", "icon ion-ios-list", "icon ion-ios-cart" ], titulo: ["Registro", "Clientes","Productos","Hacer pedido"]}, 
 //    {title:"Distribuidor", ref :["#/app/productos", "#/app/loginCliente"], icon:["#/app/mapas", "icon ion-ios-people", "icon ion-map"], titulo: ["Productos","Mapas"]},
 //    /*Admin*/{[
 //    	{ref: "#/app/registro", icon: "icon ion-person-add", titulo:"Registro"},
 //    	{ref: "#/app/clientes", icon: "icon ion-ios-people", titulo:"Clientes"}
 //    	]}
 //    ];
  
	$scope.menus = 
	[[
    	{ref: "#/app/registro", icon: "icon ion-person-add", titulo:"Registro"},
    	{ref: "#/app/clientes", icon: "icon ion-ios-people", titulo:"Lista de Clientes P"},
    	{ref: "#/app/productos", icon: "icon ion-ios-list", titulo: "Productos"},
    	{ref: "#/app/loginCliente", icon: "icon ion-ios-cart", titulo: "Hacer pedido"},
    	{ref: "#/app/listaPedidos", icon: "icon ion-ios-list", titulo: "Lista de Pedidos"}  
    	
    ],
    [
    	{ref: "#/app/clientes", icon: "icon ion-ios-people", titulo:"Lista de Clientes D"},
    	{ref: "#/app/listaEntrega", icon: "icon ion-ios-list", titulo: "Lista de Entrega"},
    	{ref: "#/app/mapas", icon: "icon ion-map", titulo: "Mapa de Entrega"} 
    ],
    [
    	{ref: "#/app/clientes", icon: "icon ion-ios-people", titulo:"Lista de Clientes A"},
    	{ref: "#/app/users", icon: "icon ion-ios-people", titulo: "Lista de Usuarios"},
    	{ref: "#/app/productos", icon: "icon ion-ios-list", titulo: "Lista de Productos"}
    	 
    ]];

  console.log($rootScope.menus);

	function doLogin(){
		if($scope.data.username == "zule" && $scope.data.password == "123"){

				console.log("zule admin");
				$state.go('app.clientes', {User: $scope.data.username});

				// $scope.menus = $scope.menus[2];
				console.log($rootScope.menus);

				$scope.data.username="";
				$scope.data.password="";
				
			
		}else
		{	
			if($scope.data.username == "a" && $scope.data.password == "123"){

				console.log("a preventista");
				$state.go('app.productos');

				$scope.data.username="";
				 $scope.data.password="";

			
			}else
			{
				if($scope.data.username == "b" && $scope.data.password == "123"){

				console.log("b distribuidor");
				$state.go('app.registro');

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
		}
	}

	$scope.mySelect = 'Administrador';
	$scope.showSelectValue = function(mySelect) {
    console.log(mySelect);
    if(mySelect == 'Preventa'){
    	console.log("bienvendido Preventa");
    	var i = 0;
    	$rootScope.menu = $scope.menus[i];
    	console.log($rootScope.menu);
    }else{
    	if(mySelect == 'Distribuidor'){
    		console.log('bienvendido Distribuidor');
    		var i = 1;
    		$rootScope.menu = $scope.menus[i];
    		console.log($rootScope.menu);

    	}else
    	{
    		if(mySelect == 'Administrador'){
    		console.log('bienvendido Admin');
    		var i = 2;
    		$rootScope.menu = $scope.menus[i];
    		console.log($rootScope.menu);

    		}
    	}
    }

	}

	function salir(){

		//if(window.navigator.app){navigator.app.exitApp();}
		//else if(window.navigator.device){navigator.device.exitApp();}
		//.log("Salir");
		ionic.Platform.exitApp();
	}
});