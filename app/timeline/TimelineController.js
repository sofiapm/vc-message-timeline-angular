angular
  .module('AppModule')
  .controller('TimelineController', ['$scope', 'AlertService', 'MessageService', 'CommentService', 'LocalStorageService',
    function ($scope, AlertService, MessageService, CommentService, LocalStorageService) {

      $scope.messagesPaginated = messagesPaginated
      $scope.postMessage = postMessage
      $scope.messages = []
      $scope.message = ''
      $scope.messagesPaginated()

      function messagesPaginated() {
        MessageService.GetPaginated()
          .then((response) => {
            if (response.success) {
              $scope.messages = response.data
            }
          })
      };

      function postMessage() {
        $scope.postingMessage = true
        const message = {
          text: $scope.message,
          author: LocalStorageService.GetUserId()
        }

        MessageService.Create(message)
          .then((response) => {
            if (response.success) {
              $scope.message = ''
            } else {
              // adds error message on alert array
              AlertService.add("error", response.message);
            }
            $scope.postingMessage = false
          })
      };

    }])
