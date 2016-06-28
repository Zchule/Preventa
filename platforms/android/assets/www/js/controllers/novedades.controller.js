CTRLS.controller('novCtrl', function($scope, BdDproyecto, $ionicPopup){
  

  $scope.listCanSwipe = true

  /** Se obtiene la referencia al objeto que contiene los ToDos */
  $scope.toDos = BdDproyecto;


  /** Funcion encargada de eliminar un ToDo */
  $scope.eliminar = function (item) {

    $scope.toDos.$remove(item).then(function(ref) {
      ref.key() === item.$id; // true
      console.log("ID: " + item.$id + " Fue eliminado");
    });

  }

  /** Funcion encargada de editar un ToDo */
  $scope.editar = function (toDo) {

    $scope.data = {
      "toDoEditado": toDo.name
    };

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.toDoEditado">',
        title: '¿Que vas a hacer?',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Guardar</b>',
            type: 'button-positive',
            onTap: function(e) {

              console.log($scope.data.toDoEditado);
              if (!$scope.data.toDoEditado) {
                console.log("No ingreso nada");
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                console.log("Ingreso " +  $scope.data.toDoEditado);

                toDo.name = $scope.data.toDoEditado;

                $scope.toDos.$save(toDo).then(function(ref) {
                  ref.key() === toDo.$id; // true
                  console.log("Editado registro " + toDo.$id);
                });

                return $scope.data.toDoEditado;
              }
            }
          }
        ]
      });
  }

  /** Funcion encargada de Agregar un ToDo */
  $scope.agregar = function() {

    $scope.data = {};

      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="data.toDoNuevo">',
        title: '¿Que vas a hacer?',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>Guardar</b>',
            type: 'button-positive',
            onTap: function(e) {

              console.log($scope.data.toDoNuevo);
              if (!$scope.data.toDoNuevo) {
                console.log("No ingreso nada");
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                console.log("Ingreso " +  $scope.data.toDoNuevo);

                /** Se guadar en firebase */
                $scope.toDos.$add({
                  "name": $scope.data.toDoNuevo
                });

                return $scope.data.toDoNuevo;
              }
            }
          }
        ]
      });

  };
});

