/**
 * Module to handle User related requests to API
 */
angular
  .module('AppModule')
  .factory('UserService', ['$http', function ($http) {
    var service = {}

    service.GetAll = GetAll
    service.GetById = GetById
    service.GetByEmail = GetByEmail

    return service

    function GetAll () {
      return $http.get('/api/user').then(handleSuccess, handleError)
    }

    function GetById (id) {
      return $http.get(`/api/user/${id}`).then(handleSuccess, handleError)
    }

    function GetByEmail (email) {
      return $http.get(`/api/user?where={"email":"${email}"}`).then(handleSuccess, handleError)
    }

    // private functions

    function handleSuccess (res) {
      return { success: true, data: res.data }
    }

    function handleError (error) {
      return function () {
        return { success: false, message: error }
      }
    }
  }])
