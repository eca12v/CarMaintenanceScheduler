var myApp = angular.module('myApp', []);


myApp.controller('addCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
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
      console.log($scope.carMileage);
      var carMileage = $scope.carMileage;
      var carMake = $scope.carMakeModel;
      var carModel = $scope.carModelModel;
      var carYear = $scope.carYearModel;
      // $http({
      //   method: 'POST',
      //   url: '/add',
      //   data: mileage
      // });
      $http({
        method: 'GET',
        url: apiMaintURL
      }).then(function(response){
        console.log(response.data.actionHolder);
        carMaintenance = response.data.actionHolder;
        var thingToSend = {
          maintenance: carMaintenance,
          mileage: carMileage,
          make: carMake,
          model: carModel,
          year: carYear
        };
        console.log(thingToSend.maintenance);
        $http({
          method: 'PUT',
          url: '/add',
          data: thingToSend
        }).then(function(response){
          console.log('user: ', response);
          //$window.location.href = '/user';
        });
      });
    };
}]);


myApp.controller('userCtrl', ['$scope', '$http', function($scope, $http){
  console.log('in userCtrl');
  $scope.allTheRecords = [];
  var masterArray =[];
  $scope.maintMiles = [];
  $http({
    method: 'GET',
    url: '/user'
  }).then(function(response){
    console.log('first object in the array: ', response.data.mileage);
    console.log('fifth index of maintenance array: ', response.data.car[4]);
    $scope.currentMileageModel = response.data.mileage;
    var mileage = response.data.mileage;
    var round = function (x, to) {
    return Math.round(x / to) * to;
    };
    mileage = round(mileage, 5000);
    console.log('mileage is: ', mileage);
    masterArray = response.data.car;


    for (var i = 0; i < 7; i++) {
      var pushedOne = (mileage - 5000) + (i * 5000);
      if (pushedOne < 0) {
        pushedOne = 0;
        $scope.maintMiles.push(pushedOne);
      }else {
        $scope.maintMiles.push(pushedOne);
      }

    }

    console.log('number: ', Number(masterArray[4].intervalMileage), 'string?: ', masterArray[4].intervalMileage);
    for (var j = 0; j < masterArray.length; j++) {
      if(mileage%(Number(masterArray[j].intervalMileage))===0){
        var pushee = masterArray[j];
        $scope.allTheRecords.push(pushee);
      }else {}
    }
  });

  var getMaintMiles = function(){
  console.log('mileage in: ', $scope.maintMilesModel);
  };
}]);
