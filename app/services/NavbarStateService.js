angular.module('AppModule')
  .factory('NavbarStateService', ['$rootScope', function ($rootScope) {
    $rootScope.showLogout = false;

    const navbarService = {
      set: function (show) {
        $rootScope.showLogout = show
      },
      get: function () {
        return $rootScope.showLogout
      }
    };
    return navbarService;
  }]);