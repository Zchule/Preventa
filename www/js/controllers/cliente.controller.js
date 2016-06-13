CTRLS.controller('ClientesCtrl', function($scope, $ionicActionSheet, $ionicModal, Clientes) {

	$scope.showOptions = showOptions;
 	$scope.editCliente = editCliente;
  $scope.showModal = showModal;
  $scope.closeModal = closeModal;
  $scope.saveCliente = saveCliente;
  $scope.deleteCliente = deleteCliente;
  $scope.verCliente = verCliente;

  $scope.isNew = true;
  $scope.cliente = {};
  $scope.modal = null;

  $ionicModal.fromTemplateUrl('templates/cliente-modal.html', {
    scope: $scope
  })

  .then(function(modal){
    $scope.modal = modal;
  });

  function showModal(){
    $scope.isNew = true;
    $scope.cliente = {};
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }

  
  function saveCliente(){
    if($scope.isNew){
      $scope.cliente.face='img/ionic.png';
      $scope.clientes.push( $scope.cliente );
      $scope.cliente ={};
    }
    $scope.modal.hide();
  }

  function deleteCliente(index){
    $scope.clientes.splice( index, 1 );
  }

  function editCliente(index){
    $scope.isNew = false;
    $scope.cliente = $scope.clientes[index];
    $scope.modal.show();
  }

  function verCliente(index){

    $scope.isNew = false;
    $scope.cliente = $scope.clientes[index];
    $scope.modal.show();
  }

	function showOptions( indexCliente ){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-edit"></i> ver' },
        { text: '<i class="icon ion-edit"></i> Editar' }
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      destructiveButtonClicked: function(){
        $scope.deleteCliente( indexCliente );
        return true;
      },
      buttonClicked: function(indexButton){
        if(indexButton == 1){
          $scope.editCliente( indexCliente );
        }
        return true;
      },
      buttonClicked: function(indexButton){
        if(indexButton == 1){
          $scope.verCliente( indexCliente );
        }
        return true;
      }
    });
  }
  $scope.clientes = Clientes.all();
});

