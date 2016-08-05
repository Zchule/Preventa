CTRLS.controller('ClientesCtrl', function($scope, $state, $ionicActionSheet, $ionicModal, Clientes, $ionicPopup, $cordovaGeolocation, $cordovaCamera, $ionicLoading) {

//$cordovaCapture
	$scope.showOptions = showOptions;
 	$scope.editCliente = editCliente;
  $scope.showModal = showModal;
  $scope.closeModal = closeModal;
  $scope.saveCliente = saveCliente;
  $scope.deleteCliente = deleteCliente;
  $scope.verCliente = verCliente;

  $scope.takePicture = takePicture;
  $scope.choosePicture= choosePicture;
  $scope.getPosition = getPosition;

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

//guradando la conexion de firebase
  $scope.clientes = Clientes;

  $scope.clientes.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  $scope.agregar = function() {
      if($scope.isNew){

       $scope.cliente.photo='img/ionic.png';

                /** Se guadar en firebase */
                $scope.clientes.$add({

                  "nombre":$scope.cliente.nombre,
                  "apPat":$scope.cliente.apPat,
                  "apMat":$scope.cliente.apMat,
                  "photo": $scope.cliente.photo,
                  "CI":$scope.cliente.CI,
                  "nombreTienda":$scope.cliente.nombreTienda,
                  "latitude":$scope.latitude,
                  "longitude":$scope.longitude

                });

                $scope.modal.hide();
                return $scope.cliente;
                
              }


          }


  function saveCliente(){
    if($scope.isNew){
      $scope.cliente.photo='img/ionic.png';
      $scope.clientes.push( $scope.cliente );
      $scope.cliente ={};
    }
    $scope.modal.hide();
  }

  function deleteCliente(index){

    $scope.clientes.$remove(index, 1);
    //$scope.clientes.splice( index, 1 );
  }

//$scope.clientes = ClienteFirebase.all();

  function editCliente(index){

    $scope.isNew = false;
    //$scope.cliente = $scope.clientes[index];
    var cliente = clienteF
    //$scope.clientes = $scope.cliente;
    // no olvidar $scope.modal.show();
    console.log($scope.clientes[index]);
    $scope.cliente.update({

                  "nombre":$scope.cliente.nombre,
                  "apPat":$scope.cliente.apPat,
                  "apMat":$scope.cliente.apMat,
                  "photo": $scope.cliente.photo,
                  "CI":$scope.cliente.CI,
                  "nombreTienda":$scope.cliente.nombreTienda,
                  "latitude":$scope.latitude,
                  "longitude":$scope.longitude

                });

                $scope.modal.hide();
                return $scope.cliente;
                
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
  function choosePicture(){
    console.log("yes!!");

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imgData){
    $scope.cliente.photo = "data:image/jpeg;base64," + imgData;
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
      $scope.cliente.photo = "data:image/jpeg;base64," + imgData;
    });

}
    function getPosition(){

    var options = {
      timeout: 3000,
      enableHighAccuracy: false,
      maximumAge: 10000
    };

    $cordovaGeolocation.getCurrentPosition( options )
    .then(function( position ){
      console.log( position );
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      console.log($scope.latitude);
      
      console.log($scope.longitude);


    }); 
  }
  //$scope.clientes = Clientes.all();
});

