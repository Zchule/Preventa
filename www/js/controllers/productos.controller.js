CTRLS.controller('ProductosCtrl', function($scope, Productos, $ionicModal, $ionicActionSheet, $ionicLoading) {
  

  $scope.showOptions = showOptions;
  $scope.editProducto = editProducto;
  $scope.openModal = openModal;

  $scope.closeModal = closeModal;
  $scope.save = save;

  $scope.isNew = true;
  $scope.producto = {};
  $scope.modal = null;

  $ionicLoading.show({
    template: 'Cargando...'
  });


    $scope.productos = Productos;

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

    function save(){
    if($scope.isNew){
      $scope.producto.face = 'ionic.png';
      $scope.productos.push( $scope.producto );
      $scope.producto = {};
    }
    $scope.modal.hide();
  }

$ionicModal.fromTemplateUrl('templates/producto-modal.html', {
    scope: $scope
  })

  .then(function(modal){
    $scope.modal = modal;
  });

  function openModal(){
    $scope.isNew = true;
    $scope.producto = {};
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

function editProducto(index){
    $scope.isNew = false;
    $scope.producto = $scope.productos[index];
    $scope.modal.show();
  }

function showOptions(indexProducto){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-clipboard"></i> ver Producto' }
      ],
      //destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          $scope.editProducto( indexProducto );
        }
        return true;
      }
    });
  }

  
});