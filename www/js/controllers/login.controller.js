CTRLS.controller('LoginCtrl', function($scope, $stateParams, $state, $ionicPopup, UsersService){
	
	$scope.data = {};
	//scope: $scope
	$scope.doLogin = doLogin;
	$scope.salir = salir;

	$scope.users = [];
	$scope.users = UsersService.all();

	//$scope.user = UsersService.get($stateParams.userId);
	console.log($scope.users);
	console.log($scope.users[1]);
	//console.log($scope.users.password);


	function doLogin(){
		if($scope.data.username == "zule" && $scope.data.password == "123"){

				$state.go('app.clientes');
			
		}else
		{
			var confirmPopup = $ionicPopup.confirm({
     			title: 'Los datos son invalidos',
     			template: 'Revise los datos ingresados'
			});
		}
	}

	function salir(){

		//.log("Salir");
		ionic.Platform.exitApp();
	}
});