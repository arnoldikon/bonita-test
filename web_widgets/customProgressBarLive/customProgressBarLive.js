(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customProgressBarLive', function() {
    return {
      controllerAs: 'ctrl',
      controller:  function($scope,$interval,$http){
    if($scope.dynamic==null){
        $scope.dynamic=0;
    }
    
    //Refresh Data
    $interval(
        function(){
            $http.get($scope.properties.api)
                .then(function(response) {
                    
                var result = response.data;
                $scope.dynamic = result[0].progress;
                if($scope.properties.measure=="%"){$scope.max=100;}
                else{$scope.max = parseInt(result[0].refer);}
            });    
        },$scope.properties.interval);
 },
      template: '<!DOCTYPE HTML>\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div>\n    <center>\n        <b>{{properties.title}}</b>\n        <uib-progressbar class="progress-striped active" max="max" value="dynamic" type="{{properties.style}}"><span style="color:white; white-space:nowrap;">{{dynamic}} / {{max}} {{properties.measure}}</span></uib-progressbar>\n    </center>\n</div>'
    };
  });
