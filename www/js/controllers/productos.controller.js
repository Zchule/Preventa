CTRLS.controller('ProductosCtrl', function($scope, Productos, $ionicModal, $ionicActionSheet, $ionicLoading){
  

  $scope.showOptions = showOptions;
  //$scope.editProducto = editProducto;
  $scope.openModal = openModal;

  $scope.closeModal = closeModal;
  $scope.producto = {};
  $scope.modal = null;

  $scope.verProducto=verProducto;

  $ionicLoading.show({
    template: 'Cargando...'
  });


    $scope.productos = Productos;

    $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

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

function verProducto(index){

    $scope.producto = $scope.productos[index];
    $scope.modal.show();
  }

function showOptions(indexProducto){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-eye"></i> ver producto' }
      ],
      //destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          $scope.verProducto( indexProducto );
        }
        return true;
      }
    });
  }

  
});