CTRLS.controller('UsersCtrl', function($scope, Users, $state, $ionicActionSheet, $ionicModal, $ionicPopup, $cordovaCamera, $ionicLoading){

  $scope.showOptions = showOptions;
  $scope.editUser = editUser;
  $scope.showModal = showModal;
  $scope.closeModal = closeModal;
  
  $scope.deleteUser = deleteUser;
  $scope.verUser = verUser;

  $scope.takePicture = takePicture;
  $scope.choosePicture= choosePicture;

  $scope.isNew = true;
  $scope.User = {};
  $scope.modal = null;

  $ionicModal.fromTemplateUrl('templates/user-modal.html', {
    scope: $scope
  })

  .then(function(modal){
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/user-modal2.html', {
    scope: $scope
  })

  .then(function(modal2){
    $scope.modal2 = modal2;
  });


  function showModal(){
    $scope.isNew = true;
    $scope.user = {};
    $scope.visibility="true";
    $scope.modal.show();
  }

  function closeModal(){
    $scope.modal.hide();
  }
  $scope.showModal2 = showModal2;

  function showModal2(){
    $scope.isNew = true;
    $scope.user = {};
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
  $scope.users = Users.all();
  
  $scope.users.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  $scope.agregarUser = function() {

    $scope.visibility=true;
      if($scope.isNew){

       $scope.user.photo='img/ionic.png';
                /** Se guadar en firebase */
                $scope.users.$add({

                  "nombre":$scope.user.nombre,
                  "apPat":$scope.user.apPat,
                  "apMat":$scope.user.apMat,
                  "photo": $scope.user.photo,
                  "CI":$scope.user.CI,
                  "Direccion":$scope.user.direccion,
                  //"lista": [{pedido:"ggg", cantidad: 23}]

                })
                .then(function() {
                  var confirmPopup = $ionicPopup.alert({
                      title: 'GUARDADO',
                      template: 'Usuario Agregado'
                       });                })
                .catch(function(error) {
                    console.log('detectado un error', error);
             });

                $scope.modal.hide();
                return $scope.user;
              }

          }

  function deleteUser(index){

    $scope.users.$remove(index, 1);
    //$scope.clientes.splice( index, 1 );
  }

//$scope.clientes = ClienteFirebase.all();

  function editUser(index){
    $scope.visibility = true;

    $scope.isNew = false;
    $scope.user = $scope.users[index];
    console.log($scope.user);

    var user = Users.getRef($scope.user.$id);
    console.log(user); 
    user.update({

                  "nombre": $scope.user.nombre,
                  "apPat": $scope.user.apPat,
                  "apMat": $scope.user.apMat,
                  "photo": $scope.user.photo,
                  "CI": $scope.user.CI,
                  "Direccion": $scope.user.direccion
     

                });

                $scope.modal.show();
                return $scope.user;
                
              }


  function verUser(index){
    
    $scope.isNew = false;
    $scope.user = $scope.users[index];

    $scope.modal2.show();
  }


	function showOptions( indexUser ){   
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-android-contact"></i> ver' },
        { text: '<i class="icon ion-edit"></i> Editar' }
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      destructiveButtonClicked: function(){
        $scope.deleteUser( indexUser );
        return true;
      },
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          console.log(indexUser); 
          $scope.verUser( indexUser );
        }else
        {
          if(indexButton == 1){
              $scope.editUser( indexUser );
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
    $scope.user.photo = "data:image/jpeg;base64," + imgData;
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
      $scope.user.photo = "data:image/jpeg;base64," + imgData;
    });

}
  //$scope.clientes = Clientes.all();
});