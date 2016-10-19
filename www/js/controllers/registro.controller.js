CTRLS.controller('RegistroCtrl', function($scope, $stateParams, Clientes, $state, $cordovaGeolocation, $cordovaCamera) {

  $scope.saveCliente = saveCliente;
  
  $scope.isNew = true;
  $scope.cliente = {};

  $scope.clientes = Clientes;
  $scope.listCanSwipe = true;

  $scope.takePicture = takePicture;
  $scope.choosePicture= choosePicture;
  $scope.getPosition = getPosition;

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
                $scope.cliente ={};
                $state.go('app.clientes');
                return $scope.cliente;


              }
              //$state.go('app.clientes');

          }



	function saveCliente(){
    if($scope.isNew){
      $scope.cliente.photo='img/ionic.png';
      $scope.clientes.push( $scope.cliente );
      $scope.cliente ={};
    }
    $state.go('app.clientes');
  }
  //$scope.clientes = Clientes.all();

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

});
