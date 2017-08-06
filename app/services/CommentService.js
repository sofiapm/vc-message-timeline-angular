/**
 * Module to handle User related requests to API
 */
angular
  .module('AppModule')
  .factory('CommentService', ['$http', function ($http) {
    const service = {}

    service.GetPaginated = GetPaginated
    service.GetById = GetById
    service.Create = Create

    return service

    function GetPaginated(messageId) {
      return $http.get(`/api/timeline/comments?message=${messageId}`).then(handleSuccess, handleError)
    }

    function GetById(id) {
      return $http.get(`/api/comment/${id}`).then(handleSuccess, handleError)
    }

    function Create(comment) {
      return $http.post('/api/comment', comment).then(handleSuccess, handleError);
    }

    // private functions

    function handleSuccess(res) {
      return { success: true, data: res.data }
    }

    function handleError(error) {
      return function () {
        return { success: false, comment: error }
      }
    }
  }])
