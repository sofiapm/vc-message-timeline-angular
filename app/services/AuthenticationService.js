/**
 * Module to handle User authentication logic
 */

angular
  .module('AppModule')
  .factory('AuthenticationService', ['UserService', 'LocalStorageService', function (UserService, LocalStorageService) {
    const service = {}

    service.Login = Login
    service.IsLogedIn = IsLogedIn
    service.Logout = Logout

    return service

    /**
     * User Login
     * @param {string} email
     * @param {string} password
     * @param {function} callback
     */

    function Login(email, password, callback) {

      /**
       * Asks User with email from API
       * If exists, consider as loged in
       */

      UserService.GetByEmail(email)
        .then(function (response) {
          if (response.success && response.data.length > 0) {

            // saves user to localstorage
            // important to very if user is loged in

            LocalStorageService.SaveUser(response.data[0])
            callback(response)
          } else {
            callback({ success: false, message: 'Credentials not valid.' })
          }
        })


      // TODO: User should be considered logedin if exists and password is correct
    }

    function Logout(callback) {
      // Removes User data from localstorage
      LocalStorageService.CleanUser()
      callback()
    }

    function IsLogedIn() {
      // Removes User data from localstorage
      return LocalStorageService.IsLogedIn();
    }
  }])
