angular
  .module('AppModule')
  .component('messageComponent', {
    templateUrl: '/components/messages/messageComponent.html',
    controller: ['CommentService', function (CommentService) {
      const ctrl = this
      ctrl.comments = []

      ctrl.get = () => {
        CommentService.GetPaginated(ctrl.message.id)
          .then((response) => {
            if (response.success) {
              ctrl.comments = response.data
            }
          })
      };
    }],
    bindings: {
      message: '='
    }
  })