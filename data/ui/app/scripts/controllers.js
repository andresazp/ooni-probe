'use strict';

ooniprobe.controller('PageCtrl', ['$scope', function($scope) {
}]);

ooniprobe.controller('SettingsCtrl', ['$scope',
                     function($scope) {
}]);

ooniprobe.controller('InputsCtrl', ['$scope', 'Inputs',
                     function($scope, Inputs) {
  $scope.inputs = Inputs.query();
  $scope.uploadComplete = function(contents, completed) {
    return;
  }

}]);

ooniprobe.controller('SideBarCtrl', ['$scope', 'listTests', '$location',
                     function($scope, listTests, $location) {
  $scope.test_list = listTests.query();

  $scope.testSelected = function(test_id) {
    var path = $location.path();
    if (path === '/test/'+test_id) {
      return true;
    }
    return false;
  }

}]);

ooniprobe.controller('TestCtrl', ['$scope', '$routeParams', 'testStatus', 'Inputs',
                     function($scope, $routeParams, testStatus, Inputs) {

  var testID = $routeParams['testID'];

  $scope.inputs = Inputs.query();

  $scope.updateTestStatus = function() {
    testStatus(testID).success(function(testDetails){
      $scope.testDetails = testDetails;
    });
  }
  $scope.updateTestStatus();


}]);

ooniprobe.controller('TestBoxCtrl', ['$scope', 'startTest',
                     function($scope, startTest) {

  $scope.startTest = function() {
    var options = {};

    angular.forEach($scope.testDetails.arguments,
                    function(option, key) {
      options[key] = option.value;
    });

    startTest($scope.testDetails.id, options).success(function(){
      $scope.updateTestStatus();
    });
  }

}]);


