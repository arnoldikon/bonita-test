(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customAddRemoveList', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope) {
    $scope.add = function(){
        $scope.properties.listResult.push($scope.properties.selectedSource);
        $scope.properties.listSource.splice($scope.properties.listSource.indexOf($scope.properties.selectedSource),1);
    };
    $scope.remove = function(){
        $scope.properties.listSource.push($scope.properties.selectedResult);
        $scope.properties.listResult.splice($scope.properties.listResult.indexOf($scope.properties.selectedResult),1);
    };
},
      template: '\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div ng-if="properties.display==\'Vertical\'">\n<center>\n    <button class="btn btn-primary" ng-click="add()"><span class="glyphicon glyphicon-chevron-right"></span></button><br/><br/>\n    <button class="btn btn-primary" ng-click="remove()"><span class="glyphicon glyphicon-chevron-left"></span></button>\n</center>\n</div>\n<div ng-if="properties.display==\'Horizontal\'">\n    <button class="btn btn-primary" ng-click="add()"><span class="glyphicon glyphicon-plus-sign"></span></button>\n    <button class="btn btn-primary" ng-click="remove()"><span class="glyphicon glyphicon-minus-sign"></span></button>\n</div>'
    };
  });
