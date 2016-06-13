SERVICES.factory('Clientes', function() {
  var clientes = [{
    id: 0,
    nombre: 'Ben',
    apPat: 'akgfklg',
    apMat: 'Rodriguez',
    CI: 124423,
    nombreTienda:'Doña Lucha',
    face: 'img/ben.png'
  }, {
    id: 1,
    nombre: 'Max',
    apPat: 'Perez',
    apMat: 'Ticona',
    CI: 1124324,
    nombreTienda:'Don Max',
    face: 'img/max.png'
  }, {
    id: 2,
    nombre: 'Adam Bradleyson',
    apPat: 'Ramirez',
    apMat: 'Quispe',
    CI: 1234654,
    nombreTienda:'Don Adam',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    nombre: 'Perry Governor',
    apPat: 'Tirado',
    apMat: 'Sola',
    CI: 33333,
    nombreTienda:'Don Perry',
    face: 'img/perry.png'
  }, {
    id: 4,
    nombre: 'Mike Harrington',
    apPat: 'Mejia',
    apMat: 'Vasquez',
    CI: 44444,
    nombreTienda:'Don Mike',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return clientes;
    }
  };
});
