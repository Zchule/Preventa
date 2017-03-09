// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var APP = angular.module('starter', [
  'ionic', 
  'ngCordova',
  'starter.controllers',
   'starter.services',
   'firebase'
   ]);
 var CTRLS = angular.module('starter.controllers', []);
 var SERVICES = angular.module('starter.services', []);

APP.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  
  });
})

.config(function($stateProvider, $urlRouterProvider) { //ionicConfigProvider
//ionicConfigProvider.sidemenu.position("botton");  //para que los tab sean de =posiition
//ionicConfigProvider.navBar.alignTitle("center"); //para que el title este en el centro
  $stateProvider

    .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'ProductosPedidoCtrl'
  })

    .state('app.loginCliente', {
    url: '/loginCliente',
    views: {
      'menuContent': {
        templateUrl: 'templates/loginCliente.html',
        controller: 'loginClienteCtrl'
      }
    }
  })

  .state('app.users', {
    url: '/users',
    views: {
      'menuContent': {
        templateUrl: 'templates/users.html',
        controller: 'UsersCtrl'
      }
    }
  })
  
  .state('app.clientes', {
      url: '/clientes/:User',
      views: {
        'menuContent': {
          templateUrl: 'templates/clientes.html',
          controller: 'ClientesCtrl'
        }
      }
    })

  .state('app.registro', {
    url: '/registro',
    views: {
      'menuContent': {
        templateUrl: 'templates/registro.html',
        controller: 'RegistroCtrl'
      }
    }
  })
  .state('app.addProductos', {
      url: '/addProductos',
      views: {
        'menuContent': {
          templateUrl: 'templates/addProductos.html',
          controller: 'addProductosCtrl'
        }
      }
    })
  .state('app.productos', {
      url: '/productos',
      views: {
        'menuContent': {
          templateUrl: 'templates/productos.html',
          controller: 'ProductosCtrl'
        }
      }
    })

    .state('app.productosPedidos', {
      url: '/productosPedidos/:cliente',
      views: {
        'menuContent': {
          templateUrl: 'templates/productosPedidos.html',
          controller: 'ProductosPedidoCtrl'
        }
      }
    })
    .state('app.listaPedidos', {
      url: '/listaPedidos',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaPedidos.html',
          controller: 'PedidosCtrl'
        }
      }
    })
    .state('app.listaEntrega', {
      url: '/listaEntrega',
      views: {
        'menuContent': {
          templateUrl: 'templates/listaPedidos.html',
          controller: 'listaEntregaCtrl'
        }
      }
    })

    .state('app.mapas', {
      url: '/mapas',
      views: {
        'menuContent': {
          templateUrl: 'templates/mapas.html',
          controller: 'MapasCtrl'
        }
      }
    })

    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
