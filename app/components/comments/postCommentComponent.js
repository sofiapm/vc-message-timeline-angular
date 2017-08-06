angular
  .module('AppModule')
  .component('postCommentComponent', {
    templateUrl: '/components/comments/postCommentComponent.html',
    controller: ['CommentService', 'LocalStorageService', function (CommentService, LocalStorageService) {
      const ctrl = this
      ctrl.finalComment = {}

      ctrl.postComment = () => {
        const comment = {
          author: LocalStorageService.GetUserId(),
          message: ctrl.message.id,
          text: ctrl.comment.text
        }
        CommentService.Create(comment)
          .then((response) => {
            if (response.success) {
              ctrl.finalComment = response.data
              ctrl.comment.text = ''
            }
          })
      };
    }],
    bindings: {
      message: '=',
      comment: '<'
    }
  })