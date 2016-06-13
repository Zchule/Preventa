SERVICES.factory('Productos', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  
  var productos = [{
    id: 0,
    name: 'Papas',
    cantidad: 'familiar',
    face: 'img/papas.jpg'
  }, {
    id: 1,
    name: 'Quinoa',
    cantidad: 'Personal',
    face: 'img/quinoa.jpg'
  }, {
    id: 2,
    name: 'Tostitos',
    cantidad: 'Personal',
    face: 'img/tostitos.png'
  }];

  return {
    all: function() {
      return productos;
    },
    remove: function(producto) {
      productos.splice(productos.indexOf(producto), 1);
    },
    get: function(productoId) {
      for (var i = 0; i < productos.length; i++) {
        if (productos[i].id === parseInt(productoId)) {
          return productos[i];
        }
      }
      return null;
    }
  };
});
