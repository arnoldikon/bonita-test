(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customPdfViewer', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope, $sce) {
    $scope.pdfUrl = null;
    if (angular.isDefined($scope.properties.contentStorageId))
        $scope.pdfUrl = $sce.trustAsResourceUrl("/"+ $scope.properties.appName +"/portal/formsDocumentImage?document="+ $scope.properties.contentStorageId);

    $scope.$watch(function(){
        return $scope.properties.contentStorageId;
    }, function (newValue, oldValue){
        if (angular.isDefined($scope.properties.contentStorageId))
            $scope.pdfUrl = $sce.trustAsResourceUrl("/"+ $scope.properties.appName +"/portal/formsDocumentImage?document="+ $scope.properties.contentStorageId);
    });
},
      template: '<iframe ng-src="{{pdfUrl}}" ng-style="{{properties.style}}" frameborder="0" scrolling="no"></iframe>'
    };
  });
