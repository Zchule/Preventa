CTRLS.controller('ClientePedidoCtrl', function($scope, $state, $rootScope, $firebaseArray, $ionicLoading, $ionicActionSheet, $ionicModal, Clientes, Pedidos, $ionicPopup, $cordovaGeolocation, $cordovaCamera) {

    $scope.showOptions = showOptions;
    $scope.pedido = {};
    $scope.pedidos = {};

    $scope.clientes = {};
    $scope.cliente = {};

    $scope.clientes = Clientes.all();

    $scope.clientes.$loaded().then(function(todo) {
        $ionicLoading.show({
            template: 'Cargando...'
        });
        $ionicLoading.hide();

    });

    console.log($scope.clientes);

    var ref = firebase.database().ref();
    var messagesRef = ref.child("pedidos");

    console.log("SIIII :" + $rootScope.clienteID);
    var query = messagesRef.orderByChild("idCliente").equalTo($rootScope.codigoCliente);

    $scope.pedidos = $firebaseArray(query);


    $scope.pedidos.$loaded().then(function(todo) {
        $ionicLoading.hide();

    });

    console.log($scope.pedidos);
    // console.log($scope.pedidos.length); 
    // $scope.seleccionar = function(){

    // console.log($scope.pedidos.length);

    // for (var i = 0; i < $cope.pedidos.length; i++) {

    // 	console.log($scope.pedidos[i]);
    // 	}
    // }

    $ionicModal.fromTemplateUrl('templates/cliente-pedido-modal.html', {
        scope: $scope
    })

    .then(function(modal3) {
        $scope.modal3 = modal3;
    });

    $scope.openModal3 = openModal3;
    $scope.closeModal3 = closeModal3;

    function openModal3() {
        // $scope.isNew = true;
        // $scope.pedido = {};
        $scope.modal3.show();
    }

    function closeModal3() {
        $scope.modal3.hide();
    }

    function showOptions(indexPedido) {
        $ionicActionSheet.show({
            buttons: [
                { text: '<i class="icon ion-android-contact"></i> Visualizar Detalles ' },

            ],
            destructiveText: "<i class='icon ion-trash-b'></i> Eliminar ",
            cancelText: 'CANCEL',
            titleText: "OPCIONES",
            destructiveButtonClicked: function() {
                $scope.deleteCliente(indexCliente);
                return true;
            },
            buttonClicked: function(indexButton) {
                if (indexButton == 0) {
                    $scope.verPedidoCli(indexPedido);
                }
                return true;
            }
        });
    }

    $scope.verPedidoCli = $scope.verPedidoCli;

    function verPedidoCliente(index) {

        console.log("ver su Pedido")
        console.log(index);
        $scope.pedido = $scope.pedidos[index];
        console.log($scope.pedido);

        $scope.modal3.show();

    }

});