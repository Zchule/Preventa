CTRLS.controller('MapasCtrl', function($scope, Clientes, $cordovaGeolocation, $ionicPlatform){

//$scope.clientes ={};
$scope.clientes = Clientes.all();

$scope.clientes.$loaded().then(function(client) {
  /*
  var map;
  
  //google maps javascript api
  function showMap(coords){
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: coords.latitude, lng: coords.longitude}, //mi posicion
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
}

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map,
      panel: document.getElementById('right-panel')
    });
  $scope.sericioDireccion = directionsService;
  $scope.display = directionsDisplay;

  //Crear marcadores
  function displayMarkers(coords, miPosition){
     var bounds = new google.maps.LatLngBounds();
     bounds.extend(miPosition);

   for (var i = 0; i < client.length; i++){

      var latlng = new google.maps.LatLng(client[i].latitude, client[i].longitude);
      var nombreTienda = client[i].nombreTienda;
      var nombreCliente = client[i].nombre;
      var celular = client[i].CI;

      createMarker(latlng, nombreTienda, nombreCliente, celular);
      bounds.extend(latlng); 
   }
   map.fitBounds(bounds);
}

function createMarker(latlng, nombreTienda, nombreCliente, celular){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nombreTienda
   });
 }

 function createPosition(latlng, nombre){
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      animation: google.maps.Animation.DROP,
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00',
      title: nombre,
   });
 }

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
  console.log($scope.list);
  console.log($scope.list[0]);

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });
  
  //var latln = new google.maps.LatLng(coords.latitude, coords.longitude);
  //console.log($scope.myPosition);
  //var origin = new google.maps.LatLng(-17.3928299, -66.14509179999999);
  //displayRoute(origin, directionsService,
  //directionsDisplay);

  function displayRoute(origin,lista, service, display) {
  console.log(origin);
  //console.log(waypoints);
  service.route({
    origin: origin,
    destination: origin,
    waypoints:lista,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, function(response, status) {
    console.log(status);
    console.log(response);

    if (status === google.maps.DirectionsStatus.OK) {
      display.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1000;
  document.getElementById('total').innerHTML = total + ' km';
}*/

  //donde arranca el mapa
  $ionicPlatform.ready(function(){
  var posOption = {timeout: 10000, enableHighAcuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOption)
  .then(function(position){
    var miNombre = "Mi posicion";
    $scope.coords = position.coords;
    $scope.myPosition = new google.maps.LatLng($scope.coords.latitude,$scope.coords.longitude);
    
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

    //showMap($scope.coords);
    //displayMarkers($scope.coords, $scope.myPosition);
    //createPosition($scope.myPosition, miNombre);
    //createMarker($scope.myPosition);
    
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
        title: nombreTienda
      });

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
});

});

/*
 //globo de informacion del marcador 2
var popup = new google.maps.InfoWindow({
        content: 'Esta es la tienda Carlos III'});
        popup.open(map, marker2);       
        
//globo de informacion al dar un clic en el marcador 2
function showInfo() {
    map.setZoom(16); //aumenta el zoom
    map.setCenter(marker.getPosition());
    var contentString = 'Ubicación Actual';
    var infowindow = new google.maps.InfoWindow({
    content: 'Aqui es donde estudio, lee mas información en:<a href="http://norfipc.com">NorfiPC</a>'});
     infowindow.open(map,marker);}
         
//Dispara accion al dar un clic en el marcador          
google.maps.event.addListener(marker, 'click', showInfo);
*/

  //displayRoute('Perth, WA', 'Sydney, NSW', directionsService,
  //directionsDisplay);

/*
  var flightPlanCoordinates = [
  {lat: -17.8223758, lng: -63.1908807},
  {lat: -20.4606679,lng: -66.8448117},
  {lat: -17.400988, lng: -66.281441},
  {lat: coords.latitude, lng: coords.longitude}
  
  ];

  var flightPlath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#4385B4',
    strokeOpacity: 1.0,
    strokeWeight:2
  });
  flightPlath.setMap(map);
*/
});