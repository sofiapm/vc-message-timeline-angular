angular
  .module('AppModule')
  .controller('LoginController', ['$scope', '$location', 'AuthenticationService', 'AlertService', function ($scope, $location, AuthenticationService, AlertService) {

    $scope.login = login
    $scope.userCredentials = {
      email: '',
      password: ''
    }

    function login() {
      $scope.dataLoading = true
      AuthenticationService.Login($scope.userCredentials.email, $scope.userCredentials.password, (response) => {
        if (response.success) {

          // user is redirected to timeline
          $location.path('/timeline')
        } else {

          // adds error message on alert array
          AlertService.add("error", response.message);
        }
        $scope.dataLoading = false
      })
    };
  }])
