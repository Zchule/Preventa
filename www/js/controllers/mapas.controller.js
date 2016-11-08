CTRLS.controller('MapasCtrl', function($scope, Clientes, $cordovaGeolocation, $ionicPlatform){

//$scope.clientes ={};
$scope.clientes = Clientes.all();

$scope.clientes.$loaded().then(function(client) {
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
});


// marcadores
var markersData=[{
  lat: -17.8223758,
  lng: -63.1908807,
  nombreTienda: "Santa Cruz",
  nombreCliente: "punto1",
  cel: 6095430

},
{
  lat: -20.4606679,
  lng: -66.8448117,
  nombreTienda: "Potosi",
  nombreCliente: "Marcelo p2",
  cel: 7095430
},
{
  lat: -17.400988,
  lng: -66.281441,
  nombreTienda:"Punto 3",
  nombreCliente: "Quillacollo",
  cel: 8095430
}

];

var map;

function displayMarkers(coords){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   console.log($scope.clientes[0]);

   var bounds = new google.maps.LatLngBounds();
   var latln = new google.maps.LatLng(coords.latitude, coords.longitude);
   bounds.extend(latln);
   console.log(bounds);

   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nombreTienda = markersData[i].nombreTienda;
      var nombreCliente = markersData[i].nombreCliente;
      var celular = markersData[i].cel;

      createMarker(latlng, nombreTienda, nombreCliente, celular);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng); 

   }
   // Depois de criados todos os marcadores,
   // a API, através da sua função fitBounds, vai redefinir o nível do zoom
   // e consequentemente a área do mapa abrangida de acordo com
   // as posições dos marcadores
   map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nombreTienda, nombreCliente, celular){
   var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      title: nombreTienda
   });
 }
 function createPosition(latlng, nombre, celular){
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      animation: google.maps.Animation.DROP,
      icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_icon&chld=bus|FFFF00',
      title: nombre,
   });
 }
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
	//google maps javascript api

function showMap(coords){
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: coords.latitude, lng: coords.longitude}, //mi posicion
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
var nombreTienda="mi position";
var celular= 7899;
createPosition(latlng, nombreTienda, celular);

var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer({ 
    //draggable: true,
    map: map,
    panel: document.getElementById('right-panel')
  });

// Instantiate an info window to hold step text.
  //var stepDisplay = new google.m/*aps.InfoWindow;

  directionsDisplay.addListener('directions_changed', function() {
    computeTotalDistance(directionsDisplay.getDirections());
  });

   var miPosition = new google.maps.LatLng(coords.latitude,coords.longitude);  //Perth

   var waypts = [];
   for (var i = 0; i < $scope.clientes.length; i++) {
     waypts.push({
      location: {
        lat: $scope.clientes[i].latitude,
        lng: $scope.clientes[i].longitude,
      },
      stepover: true
     });
   }

   var position1 = new google.maps.LatLng(-17.8223758,-63.1908807); // WA
   var position2 = new google.maps.LatLng(-20.4606679,-66.8448117); // Sydney
   var position3 = new google.maps.LatLng(-17.400988,-66.2814417); //NSW

   $scope.midir={lat: coords.latitude,lng:coords.longitude};   
   displayRoute(miPosition, position3, directionsService,
  directionsDisplay);

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
}


function displayRoute(origin, destination, service, display) {
  console.log(origin);
  console.log(destination);
  service.route({
    origin: origin,
   // origin:$scope.midir,
    destination: origin,
    //destination:{lat: -17.394255, lng: -66.150747}, 
    //waypoints: [{location: {lat:-17.8223758,lng:-63.1908807}, stopover:true },{location: {lat:-20.4606679,lng:-66.8448117}, stopover:true}],
    waypoints: [{location: {lat: -17.392003, lng: -66.155650} ,stopover:true},{location: {lat: -17.393467, lng: -66.151949} ,stopover:true}],
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, function(response, status) {
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
} 

$ionicPlatform.ready(function(){
  var posOption = {timeout: 10000, enableHighAcuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOption)
  .then(function(position){
    $scope.coords = position.coords;
    $scope.position = new google.maps.LatLng($scope.coords.latitude,$scope.coords.longitude);
    showMap(position.coords);
    displayMarkers(position.coords);
    console.log(position.coords);
    createMarker($scope.position);
  }, function(err){
    console.log('getCurrentPosition error: ' + angular.toJson(error));
  });

}); 

});