angular
  .module('AppModule')
  .component('postCommentComponent', {
    templateUrl: '/components/comments/postCommentComponent.html',
    controller: ['CommentService', 'LocalStorageService', function (CommentService, LocalStorageService) {
      const ctrl = this
      ctrl.postingComment = false

      ctrl.postComment = () => {
        ctrl.postingComment = true
        const comment = {
          author: LocalStorageService.GetUserId(),
          message: ctrl.message.id,
          text: ctrl.comment.text
        }
        CommentService.Create(comment)
          .then((response) => {
            if (response.success) {
              response.data.author = LocalStorageService.GetUser()
              ctrl.comments = ctrl.comments ? ctrl.comments.concat(response.data) : [response.data]
              ctrl.comment.text = ''
            }
            ctrl.postingComment = false
          })
      };
    }],
    bindings: {
      message: '=',
      comment: '<',
      comments: '=',
      postingComment: '<'
    }
  })