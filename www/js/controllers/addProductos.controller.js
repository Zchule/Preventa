CTRLS.controller('addProductosCtrl', function($scope, $state, $ionicActionSheet, $ionicModal, Productos, $ionicPopup, $cordovaCamera, $ionicLoading) {

//$cordovaCapture
	$scope.showOptions = showOptions;

 	$scope.editProducto= editProducto;
  $scope.openModal = openModal;
  $scope.closeModal = closeModal;
  $scope.saveProducto = saveProducto;
  $scope.deleteProducto = deleteProducto;
  $scope.verProducto = verProducto;

  $scope.takePicture = takePicture;
  $scope.choosePicture= choosePicture;
 

  $scope.isNew = true;
  $scope.producto = {};
  $scope.modal = null;

  $ionicModal.fromTemplateUrl('templates/addProducto-modal.html', {
    scope: $scope
  })

  .then(function(modal){
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/addProducto-modal2.html', {
    scope: $scope
  })

  .then(function(modal2){
    $scope.modal2 = modal2;
  });


  function openModal(){
    //$scope.isNew = true;
    $scope.producto = {};
    $scope.visibility="true";
    $scope.modal.show();
  }

  function closeModal(){

    $scope.modal.hide();
    //$scope.isNew = true;
    //$scope.cliente = {};
  }

  $scope.newProducto = function(){
    $scope.openModal();
  }

  $scope.showModal2 = showModal2;

  function showModal2(){
    $scope.isNew = true;
    $scope.producto = {};
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
  $scope.productos = Productos.all();

  $scope.productos.$loaded().then(function (todo) {
      $ionicLoading.hide();
  });

  $scope.agregarProducto = function() {

    $scope.visibility=true;
      if($scope.isNew){

       $scope.producto.photo='img/ionic.png';

                /** Se guadar en firebase */
                $scope.productos.$add({

                  "codigo":$scope.producto.codigo,
                  "nombre":$scope.producto.nombre,
                  "cantidad":$scope.producto.cantidad,
                  "Precio":$scope.producto.cantidad,
                  "photo": $scope.producto.photo

                });

                $scope.modal.hide();
                return $scope.producto;
                
              }
          }

  $scope.updateProducto = function(){
    console.log("updateProducto");
    var producto = Productos.getRef($scope.producto.$id);
    console.log(producto); 
    producto.update({
                  "codigo":$scope.producto.codigo,
                  "nombre":$scope.producto.nombre,
                  "cantidad":$scope.producto.cantidad,
                  "Precio":$scope.producto.cantidad,
                  "photo": $scope.producto.photo
                });

                $scope.modal.show();
                return $scope.producto;
  }
  function saveProducto(){

      if($scope.isNew){
        $scope.agregarProducto();
        console.log("nuevo");
      }else{

        $scope.updateProducto();
      }
    }
  function deleteProducto(index){

    $scope.productos.$remove(index, 1);
    //$scope.clientes.splice( index, 1 );
  }
  function editProducto(index){

    console.log("edit");
    $scope.isNew = false;
    $scope.visibility = true;
    $scope.producto = $scope.productos[index];
    console.log($scope.producto);
    $scope.modal.show();

  }

  function verProducto(index){
    //$scope.visibility=false;
    $scope.isNew = false;
    $scope.producto = $scope.productos[index];

    $scope.modal2.show();
  }

	function showOptions( indexProducto ){    
    $ionicActionSheet.show({
      buttons: [
        { text: '<i class="icon ion-android-contact"></i> ver Producto' },
        { text: '<i class="icon ion-edit"></i> Editar Producto' }
      ],
      destructiveText: "<i class='icon ion-trash-b'></i> Delete",
      cancelText: 'CANCEL',
      titleText: "OPCIONES",
      destructiveButtonClicked: function(){
        $scope.deleteProducto( indexProducto );
        return true;
      },
      buttonClicked: function(indexButton){
        if(indexButton == 0){
          $scope.verProducto( indexProducto );
        }else
        {
          if(indexButton == 1){
              $scope.editProducto( indexProducto );
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
    $scope.producto.photo = "data:image/jpeg;base64," + imgData;
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
      $scope.producto.photo = "data:image/jpeg;base64," + imgData;
    });

}
});