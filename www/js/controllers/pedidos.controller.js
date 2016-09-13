CTRLS.controller('PedidosCtrl', function($scope, BdDproyecto, Clientes, $ionicPopup, $cordovaGeolocation, $ionicPlatform){

$scope.clientes = Clientes.all();

//google maps javascript api
var map;
function showMap(coords){
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: coords.latitude, lng: coords.longitude},
    zoom:8
  });
    
  var market = new google.maps.Marker({
    position:{lat: coords.latitude, lng: coords.longitude},
    map: map,
    title: "Hello World"
  });


}

$ionicPlatform.ready(function(){
  var posOption = {timeout: 10000, enableHighAcuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOption)
  .then(function(position){
    $scope.coords = position.coords;
    showMap(position.coords);
  }, function(err){
    console.log('getCurrentPosition error: ' + angular.toJson(error));
  });

});


});

