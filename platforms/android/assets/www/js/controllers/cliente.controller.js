CTRLS.controller('ClientesCtrl', function($scope, $state, $ionicActionSheet, $ionicModal, Clientes, $ionicPopup, $cordovaGeolocation, $cordovaCamera, $ionicLoading) {

//$cordovaCapture
	$scope.showOptions = showOptions;
 	$scope.editCliente = editCliente;
  $scope.openModal = openModal;
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

  $ionicModal.fromTemplateUrl('templates/cliente-modal2.html', {
    scope: $scope
  })

  .then(function(modal2){
    $scope.modal2 = modal2;
  });


  function openModal(){
    //$scope.isNew = true;
    $scope.cliente = {};
    $scope.visibility="true";
    $scope.modal.show();
  }

  function closeModal(){

    $scope.modal.hide();
    //$scope.isNew = true;
    //$scope.cliente = {};
  }

  $scope.newCliente = function(){
    $scope.openModal();
  }

  $scope.showModal2 = showModal2;

  function showModal2(){
    $scope.isNew = true;
    $scope.cliente = {};
    $scope.visibility="true";
    $scope.modal2.show();
  }
  $scope.closeModal2 = closeModal2;

  function closeModal2(){
    $scope.modal2.hide();
  }


  $ionicLoading.show({
    template:'Cargando...'
  });

//guardando la conexion de firebase
  $scope.clientes = Clientes.all();

  $scope.clientes.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  $scope.agregarCliente = function() {

    $scope.visibility=true;
      if($scope.isNew){

       //$scope.cliente.photo='img/ionic.png';
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

  $scope.updateCliente = function(){
    console.log("updateCliente");
    var cliente = Clientes.getRef($scope.cliente.$id);
    console.log(cliente); 
    cliente.update({

                  "nombre": $scope.cliente.nombre,
                  "apPat": $scope.cliente.apPat,
                  "apMat": $scope.cliente.apMat,
                  "photo": $scope.cliente.photo,
                  "CI": $scope.cliente.CI,
                  "nombreTienda": $scope.cliente.nombreTienda,
                  //"lista": [1,2,3]
                  //latitude: $scope.latitude,
                  //longitude: $scope.longitude
                });

                $scope.modal.show();
                return $scope.cliente;
  }
  function saveCliente(){

      if($scope.isNew){
        $scope.agregarCliente();
        console.log("nuevo");
      }else{

        $scope.updateCliente();
      }
    }
  function deleteCliente(index){

    $scope.clientes.$remove(index, 1);
    //$scope.clientes.splice( index, 1 );
  }

//$scope.clientes = ClienteFirebase.all();

  function editCliente(index){

    console.log("edit");
    $scope.isNew = false;
    $scope.visibility = true;
    $scope.cliente = $scope.clientes[index];
    console.log($scope.cliente);
    $scope.modal.show();

  }

  function verCliente(index){
    //$scope.visibility=false;
    var inputs =document.getElementsByTagName("input");
    console.log(inputs);

    $scope.isNew = false;
    $scope.cliente = $scope.clientes[index];

    $scope.modal2.show();
  }

  $scope.verPedidoCliente = verPedidoCliente;
  function verPedidoCliente(index){
    console.log("verPedidoCliente")
  }

	function showOptions( indexCliente ){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-android-contact"></i> ver' },
        { text: '<i class="icon ion-edit"></i> Editar' },
        {text: '<i class="icon ion-clipboard"></i> Ver Pedidos' }
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
          }else
          {
             
          if(indexButton == 2){
              $scope.verPedidoCliente( indexCliente );
          }
      
          }
        }
        return true;
      }
    });
  }
  function choosePicture(){
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
    },function(err){
      console.log(err);
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
    },function(err){
      console.log(err);
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
      console.log(position);
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;

      var confirmPopup = $ionicPopup.alert({
                      title: 'AGREGADO',
                      template: 'su ubicacion fue Agregado'
                       });
      //$scope.coords=position.coords;  //para agarrar en conjunto
      console.log($scope.latitude);
      console.log($scope.longitude);


    }); 
  }
  //$scope.clientes = Clientes.all();
});

