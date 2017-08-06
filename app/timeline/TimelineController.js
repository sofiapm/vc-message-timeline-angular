angular
  .module('AppModule')
  .controller('TimelineController', ['$scope', 'AlertService', 'MessageService', 'LocalStorageService',
    function ($scope, AlertService, MessageService, LocalStorageService) {

      $scope.messagesPaginated = messagesPaginated
      $scope.postMessage = postMessage
      $scope.messages = []
      $scope.message = ''
      $scope.messagesPaginated()

      /**
       * Messages
       */

      // Get list of messages

      function messagesPaginated() {
        MessageService.GetPaginated()
          .then((response) => {
            if (response.success) {
              $scope.messages = response.data
            }
          })
      };

      // Post new message

      function postMessage() {
        $scope.postingMessage = true
        const message = {
          text: $scope.message,
          // Gets current user id
          author: LocalStorageService.GetUserId()
        }

        MessageService.Create(message)
          .then((response) => {
            if (response.success) {
              response.data.author = LocalStorageService.GetUser()
              $scope.messages = [response.data].concat($scope.messages)

              $scope.message = ''
            } else {
              // adds error message on alert array
              AlertService.add("error", response.message || 'Error posting message.');
            }
            $scope.postingMessage = false
          })
      };
    }])
