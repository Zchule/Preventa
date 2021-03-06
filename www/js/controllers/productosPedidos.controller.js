CTRLS.controller('ProductosPedidoCtrl',
    function($scope, $ionicLoading, $rootScope, Clientes,
        $location, $stateParams, Productos, Pedidos, ClientePedido, $ionicModal, $timeout, $state, $ionicPopup, $ionicActionSheet, $ionicLoading) {

        $scope.showOptions = showOptions;
        $scope.loginData = {};

        $scope.pedidos = [];
        $scope.pedidos = Pedidos.all();

        $scope.clientePedido = [];
        $scope.clientePedido = ClientePedido.all();

        $scope.productos = [];
        $scope.productos = Productos.all();


        $scope.openModal = openModal;
        $scope.closeModal = closeModal;


        $scope.pedido = {};
        $scope.producto = {};

        $ionicLoading.show({
            template: 'Cargando...'
        });

        $scope.productos.$loaded().then(function(todo) {
            $ionicLoading.hide();

            $scope.pedidos.$watch(function(event) {

                if (event.event == 'child_added') {

                    var cliente = ClientePedido.getRef($rootScope.clienteKey + '/' + event.key);

                    cliente.update(

                        { id_pedido: event.key }

                    );



                }

                console.log(event.event);
            });

        });

        $ionicModal.fromTemplateUrl('templates/producto-pedido-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        })

        .then(function(modal) {
            $scope.modal = modal;
        });

        function openModal() {
            $scope.isNew = true;
            $scope.pedido = {};
            $scope.modal.show();
        }
        /*$scope.pedido={
          nombre:"juan",
          codigo: 123,
          listaProductos:[{name:"papas", cantidad:10}, {name:"papas", cantidad:10}, {name:"papas", cantidad:10}]

        }*/

        function closeModal() {
            $scope.modal.hide();
        }

        $scope.Salir = function() {
            $scope.modal.hide();
        }

        //var test = 0;
        function showOptions(indexProducto) {
            console.log("index Product " + indexProducto);
            //test = indexProducto;
            //$rootScope.indexP= indexProducto;
            $ionicActionSheet.show({
                buttons: [
                    { text: '<i class="icon ion-clipboard"></i> Realizar Pedido' }
                ],
                //destructiveText: "<i class='icon ion-trash-b'></i> Delete",
                cancelText: 'CANCEL',
                titleText: "OPCIONES",

                buttonClicked: function(indexButton) {
                    if (indexButton == 0) {
                        //console.log("TEST "+test);
                        $scope.hacerPedido(indexProducto);

                    }
                    return true;
                }
            });
        }
        $scope.hacerPedido = function(index) {
            console.log("index" + index);
            $scope.pedido.total = "";
            $scope.producto = $scope.productos[index];
            $scope.modal.show();
            console.dir($scope.producto);
            $scope.productoID = $scope.producto.$id;
            $scope.productoPhoto = $scope.producto.photo;
            console.log($scope.productoID);
            console.log($scope.producto.precio);

            $scope.pedido.cantProducto = 1;
        }
        $scope.isNew = true;

        $scope.guardarPedido = function(cantProducto) {
            // id del preventista
            console.log($scope);
            console.log($rootScope);
            var userID = $rootScope.usuarioID;
            console.log(userID); // id de preventista
            var userPreventa = $rootScope.usuarioRol;
            console.log(userPreventa); //rol del preventista
            //muestra el codigo del cliente

            $scope.clienteID = $rootScope.clienteID;
            $scope.pedido.cantProducto = cantProducto;
            $scope.pedido.total = parseInt($scope.pedido.cantProducto * $scope.producto.precio);
            /** Se guadar en firebddddddfase */
            $scope.pedidos.$add({

                "idproducto": $scope.productoID,
                "idPreventista": userID,
                "idCliente": $scope.clienteID,
                "photo": $scope.productoPhoto,
                "cantidadProducto": $scope.pedido.cantProducto,
                "total": $scope.pedido.total,

            }).then(function(ref) {
                var id = ref.key();
                console.log("added record with id " + id);
                //list.$indexFor(id); // returns location in the array
            });


            var confirmPopup = $ionicPopup.alert({
                title: 'EXIT',
                template: 'su pedido fue ingresado'
            });

            $scope.modal.hide();
            $state.go("app.productosPedidos");
        }

        function savePedido() {

            if ($scope.isNew) {
                $scope.agregarPedido();
                console.log("nuevo");
            } else {

                $scope.pedido();
            }
        }

        $scope.pedido = function(cantProducto) {
            var userID = $rootScope.usuarioID;
            var userPreventa = $rootScope.usuarioRol;
            $scope.clienteID = $rootScope.clienteID;
            $scope.pedido.cantProducto = cantProducto;
            $scope.pedido.total = parseInt($scope.pedido.cantProducto * $scope.producto.precio);


            /** Se actualiza en firebase */
            $scope.pedidos.$add({

                "idproducto": $scope.productoID,
                "idPreventista": userID,
                "idCliente": $scope.clienteID,
                "photo": $scope.productoPhoto,
                "cantidadProducto": $scope.pedido.cantProducto,
                "total": $scope.pedido.total,
                "fecha_pedido": firebase.database.ServerValue.TIMESTAMP
            }).then(function(value) {

                console.log(value.$id);
            });

            //console.log('SIIIII' + aux.key());

        };

        //filtrar po codigo de cliente
        $scope.pedidos.$loaded().then(function(todo) {

        });

        Pedidos.all().forEach(function(element) {
            console.dir(element);
            console.log(element);
        });
        /*
          var filtrarPedido = function(idCliente){
                var pedidosVendidos=[];
                var j=0;
               for (var i = 0; i < listaPedido.length; i++) {
                        if(listaPedido[i].idCliente == idCliente){
                          listPedidos[j]=listaPedido[i];
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