/**
 * Module to handle User related requests to API
 */
angular
  .module('AppModule')
  .factory('MessageService', ['$http', function ($http) {
    const service = {}

    service.GetPaginated = GetPaginated
    service.GetById = GetById
    service.Create = Create

    return service

    function GetPaginated () {
      return $http.get('/api/timeline/messages').then(handleSuccess, handleError)
    }

    function GetById (id) {
      return $http.get(`/api/message/${id}`).then(handleSuccess, handleError)
    }

    function Create(message) {
        return $http.post('/api/message', message).then(handleSuccess, handleError);
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
