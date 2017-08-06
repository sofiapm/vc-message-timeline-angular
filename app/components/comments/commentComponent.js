angular
  .module('AppModule')
  .component('commentComponent', {
    templateUrl: '/components/comments/commentComponent.html',
    bindings: {
      comment: '='
    }
  })