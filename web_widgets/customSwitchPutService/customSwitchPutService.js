(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customSwitchPutService', function() {
    return {
      controllerAs: 'ctrl',
      controller: function($scope,$http){
    
    $scope.clicked = function(){
        var bool = ($scope.properties.value=="true");
        bool = !bool;
        $scope.properties.value = bool.toString();
        
        $http.put($scope.properties.url,$scope.properties.dataSend)
        .then(function(response) {
        });
        
    };
    
    $scope.isTrue = function(value){
    if (typeof(value) === 'string'){
        value = value.trim().toLowerCase();
    }
    switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default: 
            return false;
        }
    };
},
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div>\n    <label class="switch">\n        <input type="checkbox" ng-model="isTrue(properties.value)" ng-click="clicked()">\n        <span class="slider"></span>\n    </label>\n    {{properties.label}}\n</div>'
    };
  });
