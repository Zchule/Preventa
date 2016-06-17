CTRLS.controller('LoginCtrl', function($scope, $state, $ionicPopup){
	
	$scope.data = {};
	$scope.doLogin = doLogin;

	function doLogin(){
		if($scope.data.username == "A" && $scope.data.password == "123"){
			$state.go('app.clientes');
		}else
		{
			var confirmPopup = $ionicPopup.confirm({
     			title: 'Los datos son invalidos',
     			template: 'Revise los datos ingresados'
			});
		}
	}
});