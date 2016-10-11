CTRLS.controller('MapasCtrl', function($scope, $cordovaGeolocation, $ionicPlatform){

// marcadores
var markersData=[{
  lat: 40.6386333,
  lng: -8.745,
  nombreTienda: "Parque de Campismo Praia da Barra",
  nombreCliente: "Maria",
  cel: 6095430

},
{
  lat: 40.59955,
  lng: -8.7498167,
  nombreTienda: "Parque de Campismo da Costa Nova",
  nombreCliente: "Marcelo",
  cel: 7095430
},
{
  lat: 40.6247167,
  lng: -8.7129167,
  nombreTienda:"Parque de Campismo da Gafanha da Nazaré",
  nombreCliente: "Maria Elena",
  cel: 8095430
}

];

var map;

function displayMarkers(coords){

   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores

   var bounds = new google.maps.LatLngBounds();
   var latln = new google.maps.LatLng(coords.latitude, coords.longitude);
   
   bounds.extend(latln);
   console.log(bounds);

   // Loop que vai percorrer a informação contida em markersData 
   // para que a função createMarker possa criar os marcadores 
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
/*
function initialize() {
   var mapOptions = {
      center: new google.maps.LatLng(40.601203,-8.668173),
      zoom: 9,
      mapTypeId: 'roadmap',
   };

}*/
	//google maps javascript api

function showMap(coords){
  map = new google.maps.Map(document.getElementById('map'),{
    center: {lat: coords.latitude, lng: coords.longitude},
    zoom:8
  });
}

$ionicPlatform.ready(function(){
  var posOption = {timeout: 10000, enableHighAcuracy: true};
  $cordovaGeolocation.getCurrentPosition(posOption)
  .then(function(position){
    $scope.coords = position.coords;
    showMap(position.coords);
    displayMarkers(position.coords);
    createMarker(position.coords);
  }, function(err){
    console.log('getCurrentPosition error: ' + angular.toJson(error));
  });

}); 

});