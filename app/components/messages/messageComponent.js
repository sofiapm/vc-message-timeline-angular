angular
  .module('AppModule')
  .component('messageComponent', {
    templateUrl: '/components/messages/messageComponent.html',
    controller: ['CommentService', function (CommentService) {
      const ctrl = this
      ctrl.comments = []
      ctrl.showComments = true

      ctrl.get = () => {
        if (ctrl.showComments) {
          CommentService.GetPaginated(ctrl.message.id)
            .then((response) => {
              if (response.success) {
                ctrl.comments = response.data
              }
            })
        }
      }

      ctrl.showHideComments = () => {
        ctrl.showComments = !ctrl.showComments
      }
    }],
    bindings: {
      message: '=',
      comments: '<',
      showComments: '<'
    }
  })