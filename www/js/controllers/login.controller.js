CTRLS.controller('LoginCtrl', function($scope, Users, $rootScope, $stateParams, $state, $ionicPopup){
	
	$scope.data = {};
	//scope: $scope
	$scope.doLogin = doLogin;
	$scope.salir = salir;

	$scope.users = [];
	$scope.users = Users.all();

	console.log($scope.users);


	function doLogin(){
		if($scope.data.username == "zule" && $scope.data.password == "123"){

				console.log("zule admin");
				//$rootScope.sesion = "preventista";
				$state.go('app.clientes', {User: $scope.data.username});

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

	$scope.showSelectValue = function(mySelect) {
    console.log(mySelect);
    if(mySelect == 'Admin')

    	console.log("bienvendido admin");

	}

	function salir(){

		//if(window.navigator.app){navigator.app.exitApp();}
		//else if(window.navigator.device){navigator.device.exitApp();}
		//.log("Salir");
		ionic.Platform.exitApp();
	}
});