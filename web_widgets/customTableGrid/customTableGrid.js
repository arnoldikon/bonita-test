(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customTableGrid', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope) {

    $scope.addItem = function(){
        var item = {};
        
        if($scope.properties.collection.length>0){
            for (var key in $scope.properties.collection[0]){
                item[key] = null;
            }
        }
        else{
            var i = 0;
            item.persistenceId=null;
            for(i=0;i<$scope.properties.columnKey.length;i++){
                item[$scope.properties.columnKey[i]] = null;
            }
        }
        
        $scope.properties.collection.push(item);
    };
    
    $scope.removeItem = function(row){
        var index = $scope.properties.collection.indexOf(row);
        if (index !== -1) {
            $scope.properties.collection.splice(index, 1);
        }
    };
    
}
,
      template: '<!DOCTYPE HTML>\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<table class="table table-hover">\n	<thead>\n	<tr>\n	    <th>#</th>\n		<th ng-repeat="row in properties.header">{{row}}</th>\n		<th ng-if="properties.isAdd"><a href="#" ng-click="addItem()"><center><i class="glyphicon glyphicon-plus"></i></center></a></th>\n	</tr>   \n	</thead>\n	\n	<tbody>\n    	<tr ng-repeat="row in properties.collection">\n    	    <td>{{ $index+ 1}}</td>\n            <td ng-repeat="key in properties.columnKey track by $index">\n                \n                <!--Select-->\n                <div ng-if="properties.fieldType[$index]==\'select\'">\n                    <select class="form-control" ng-model="row[key]" ng-required="properties.required[$index]" ng-options="value.code as value.label for value in properties.optionCollection[key]">\n                    </select>\n                </div>\n                \n                <!--Else-->\n                <div ng-if="properties.fieldType[$index]!=\'select\'">\n                    <input class="form-control" ng-model="row[key]" type="{{properties.fieldType[$index]}}" ng-required="properties.required[$index]">\n                </div>\n            </td>\n            \n            <!-- Delete Button -->\n    	    <td>\n    	        <center>\n    				<i class="glyphicon glyphicon-minus text-danger" ng-click="removeItem(row)"></i>\n    			</center>\n			</td>\n    	</tr>\n	</tbody>\n</table>\n<div ng-if="properties.collection.length==0">\n    <br/><i>No records found</i>\n</div>'
    };
  });
