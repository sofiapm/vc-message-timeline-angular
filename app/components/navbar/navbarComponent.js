angular
  .module('AppModule')
  .component('navbarComponent', {
    templateUrl: '/components/navbar/navbarComponent.html',
    controller: ['AuthenticationService', '$location', 'NavbarStateService', '$rootScope', 'AlertService',
      function (AuthenticationService, $location, NavbarStateService, $rootScope, AlertService) {
        NavbarStateService.set(AuthenticationService.IsLogedIn())

        const ctrl = this
        ctrl.showLogout = NavbarStateService.get()

        ctrl.logout = () => {
          AuthenticationService.Logout(() => {
            $location.path('/login')
            NavbarStateService.set(false)
            ctrl.showLogout = false
          })
        }
        ctrl.userCredentials = {
          email: '',
          password: ''
        }

        ctrl.login = () => {
          ctrl.dataLoading = true
          AuthenticationService.Login(ctrl.userCredentials.email, ctrl.userCredentials.password, (response) => {
            if (response.success) {

              // user is redirected to timeline
              $location.path('/timeline')
              NavbarStateService.set(true)
              ctrl.showLogout = true
            } else {

              // adds error message on alert array
              AlertService.add("error", response.message);
            }
            ctrl.dataLoading = false
          })
        }
      }],
    bindings: {
    }
  })