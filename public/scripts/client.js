var myApp = angular.module('myApp', []);


myApp.controller('addCtrl', ['$scope', '$http', function($scope, $http){
  $scope.carMake = [];
  $scope.carModel = [];
  $scope.carYear = [];
  var id;

  var apiMakesURL = 'http://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=8wy99gdhrshfam5ydyjydakb';

  $http({
      method: 'GET',
      url: apiMakesURL
    }).then( function( response ){
      console.log('first name', response.data.makes[5].name);
      console.log('lengthc', response.data.makes.length);
      for (var i = 0; i < response.data.makes.length; i++) {
        $scope.carMake.push(response.data.makes[i].name);
      }
    });

    $scope.getCarModels = function(){
      $scope.carModel.length = 0;
      $scope.carYear.length = 0;
      var apiModelsURL = 'https://api.edmunds.com/api/vehicle/v2/' + $scope.carMakeModel + '/models?fmt=json&api_key=8wy99gdhrshfam5ydyjydakb';
      console.log(apiModelsURL);
      //var carModelKey = $scope.carMake.indexOf($scope.carMake);

      $http({
          method: 'GET',
          url: apiModelsURL
        }).then( function( response ){
          console.log('first name', response.data.models[5].name);
          console.log('lengthc', response.data.models.length);
          for (var i = 0; i < response.data.models.length; i++) {
            $scope.carModel.push(response.data.models[i].name);
          }
        });
    };

    $scope.getCarYears = function(){
      $scope.carYear.length = 0;
      var apiYearsURL = 'http://api.edmunds.com/api/vehicle/v2/' + $scope.carMakeModel + '/' + $scope.carModelModel + '/years??fmt=json&api_key=8wy99gdhrshfam5ydyjydakb';
      console.log(apiYearsURL);
      //var carModelKey = $scope.carMake.indexOf($scope.carMake);

      $http({
          method: 'GET',
          url: apiYearsURL
        }).then( function( response ){
          console.log('first name', response.data.years[5].year);
          console.log('lengthc', response.data.years.length);
          for (var i = 0; i < response.data.years.length; i++) {
            $scope.carYear.push(response.data.years[i].year);
          }
        });
    };

    $scope.getMakeModelId = function(){
      var apiYearsURL = 'http://api.edmunds.com/api/vehicle/v2/' + $scope.carMakeModel + '/' + $scope.carModelModel + '/' + $scope.carYearModel + '?fmt=json&api_key=8wy99gdhrshfam5ydyjydakb';
      console.log(apiYearsURL);
      //var carModelKey = $scope.carMake.indexOf($scope.carMake);

      $http({
          method: 'GET',
          url: apiYearsURL
        }).then( function( response ){
          console.log('Car make model year id: ', response.data);
          id=response.data.id;
          console.log('id: ', id);
        });
    };

    $scope.submitCar = function(){
      var apiMaintURL = 'https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid=' + id + '&fmt=json&api_key=8wy99gdhrshfam5ydyjydakb';
      console.log(apiMaintURL);

      $http({
        method: 'GET',
        url: apiMaintURL
      }).then(function(response){
        console.log(response.data.actionHolder);
        var thingToSend = response.data.actionHolder;
        $http({
          method: 'PUT',
          url: '/add',
          data: thingToSend
        });
      });

    };
}]);
