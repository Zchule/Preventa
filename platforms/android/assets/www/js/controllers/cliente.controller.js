CTRLS.controller('ClientesCtrl', function($scope, $ionicActionSheet, $ionicModal, Clientes, $ionicPopup, $ionicLoading) {

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


  $ionicLoading.show({
    template: 'Cargando...'
  });

  $scope.clientes = Clientes;

  $scope.clientes.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  $scope.agregar = function() {
      if($scope.isNew){

        $scope.cliente.face='img/ionic.png';

                /** Se guadar en firebase */
                $scope.clientes.$add({

                  "nombre":$scope.cliente.nombre,
                  "apPat":$scope.cliente.apPat,
                  "apMat":$scope.cliente.apMat,
                  "face": $scope.cliente.face,
                  "CI":$scope.cliente.CI,
                  "nombreTienda":$scope.cliente.nombreTienda

                });
                $scope.modal.hide();
                return $scope.cliente;
              }

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

    $scope.clientes.$remove(index, 1);
    //$scope.clientes.splice( index, 1 );
  }

  function editCliente(index){
    $scope.isNew = false;
    $scope.cliente = $scope.clientes[index];
    
    //$scope.clientes = $scope.cliente;
    $scope.modal.show();

    console.log($scope.clientes[index, 1]);

  }

  function verCliente(index){

    $scope.isNew = false;
    $scope.cliente = $scope.clientes[index];
    $scope.modal.show();
  }

	function showOptions( indexCliente ){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-android-contact"></i> ver' },
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
        if(indexButton == 0){
          $scope.verCliente( indexCliente );
        }else
        {
          if(indexButton == 1){
              $scope.editCliente( indexCliente );
          }
        }
        return true;
      }
    });
  }

  function takePicture(){
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture( options )
    .then(function( imgData ){
      $scope.cliente.face = "data:image/jpeg;base64," + imgData;
    });

  }




  //$scope.clientes = Clientes.all();
});

