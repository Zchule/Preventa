CTRLS.controller('MapasCtrl', function($scope, Clientes, $cordovaGeolocation, $ionicPlatform){

//$scope.clientes ={};
$scope.clientes = Clientes.all();

$scope.clientes.$loaded().then(function(client) {

  //donde arranca el mapa
  $ionicPlatform.ready(function(){
  var posOption = {timeout: 10000, enableHighAcuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOption)
  .then(function(position){
    var miNombre = "Mi posicion";
    $scope.coords = position.coords;
    $scope.myPosition = new google.maps.LatLng($scope.coords.latitude,$scope.coords.longitude);
    console.log($scope.coords);
    // showMap
    var map = new google.maps.Map(document.getElementById('map'),{
      center: {lat: $scope.coords.latitude, lng: $scope.coords.longitude}, //mi posicion
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    var marker = new google.maps.Marker({
      map: map,
      position: $scope.myPosition,
      animation: google.maps.Animation.DROP,
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00',
      title: miNombre,
   });

    //displayMarkers($scope.coords, $scope.myPosition);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend($scope.myPosition);
    
    for (var i = 0; i < client.length; i++){
      var latlng = new google.maps.LatLng(client[i].latitude, client[i].longitude);
      var nombreTienda = client[i].nombreTienda;
      var nombreCliente = client[i].nombre;
      var celular = client[i].CI;

      //createMarker(latlng, nombreTienda, nombreCliente, celular);
      var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        title: nombreTienda,
      });

      var popup = new google.maps.InfoWindow({content: nombreTienda});
      popup.open(map, marker);

      bounds.extend(latlng); 
    }
    map.fitBounds(bounds);

    //displayRoute($scope.myPosition,$scope.list, $scope.sericioDireccion, $scope.display);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      panel: document.getElementById('right-panel')
    });

  $scope.list = [];
    for (var i = 0; i < client.length; i++) {
      $scope.list[i] = {
        location: {
          lat: client[i].latitude,
          lng: client[i].longitude,
        },
        stopover: true,
      };
    }


  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

    directionsService.route({
      origin: $scope.myPosition,
      destination: $scope.myPosition,
      waypoints: $scope.list,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, function(response, status) {
      console.log(response);
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });   

  }, function(err){
    console.log('getCurrentPosition error: ' + angular.toJson(err));
  });

        function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
      }


});

});

});