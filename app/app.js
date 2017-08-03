
angular
  .module('AppModule', ['ngRoute', 'ngCookies'])
  // intercepts http requests
  // if request url has `api` string, then changes base url to server url
  .factory('routeInterceptor', function () {
       var routeInterceptor = {
        request: function(config) {
            if(config.url.indexOf('/api') === 0){
                config.url = vcMessagesConfig.api.base_url+config.url
            }
            return config;
        }
    };

    return routeInterceptor
  })
  // routing configuration
  .config([ '$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('routeInterceptor')

    $routeProvider
      .when('/timeline', {
        controller: 'TimelineController',
        templateUrl: 'timeline/timeline.view.html'
      })

      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.view.html'
      })

      .otherwise({ redirectTo: '/login' })
  }])
  .run( ['$rootScope', '$location', 'LocalStorageService', function ($rootScope, $location, LocalStorageService) {

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            const restrictedPage = ['/login'].indexOf($location.path()) === -1;
            const loggedIn = LocalStorageService.IsLogedIn();

            // redirect to login page if not logged in and trying to access a restricted page
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            // redirect to timeline page if logged in and trying to access the login page
            else if (!restrictedPage && loggedIn) {
                $location.path('/timeline');
            }
        });
    }])
