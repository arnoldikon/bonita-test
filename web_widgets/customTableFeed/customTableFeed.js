(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customTableFeed', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope,$http) {
    
    /** Local Function **/
    function loadData(apiDataUrlIn){
        $http.get(apiDataUrlIn)
        .then(function(response) {
    
            $scope.collection = response.data;
        });
    }
    
    function countData(apiCountUrlIn){
        
        $http.get(apiCountUrlIn)
            .then(function(response) {
        
            $scope.totalData = response.data[0];
        });
    }
    
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    /** Filters **/
    $scope.filters = [];
    if($scope.queryName!="find"){
        var i=0;
        for(i=0;i<$scope.properties.filters.length;i++){
            $scope.filters = "&f="+encodeURI($scope.properties.filters[i]);
        }
    }
    
    /** Record **/
    $scope.record = {
        "p":0,
        "c":10,
        "o":$scope.properties.columnKey[0],
        "s":"",
        "reverseSort":false
    };
    
    /** First Load **/
    $scope.firstLoad = true;
    if($scope.firstLoad){
        /** BDM API **/
        var apiDataUrl = "../API/bdm/businessData/"+$scope.properties.businessData+"?q="+$scope.properties.queryName+"&p="+$scope.record.p+"&c="+$scope.record.c+$scope.filters.toString();
        var apiCountUrl = "../API/bdm/businessData/"+$scope.properties.businessData+"?q=countFor"+capitalizeFirstLetter($scope.properties.queryName)+"&p=0&c=1"+$scope.filters.toString();
        
        /** Load Data **/
        loadData(apiDataUrl);
        countData(apiCountUrl);
        
        $scope.firstLoad = false;
    }
    
    /** Sorting **/
    $scope.sortBy = function(fieldName) {
        $scope.record.reverseSort = ($scope.record.o === fieldName) ? !$scope.record.reverseSort : false;
        $scope.record.o = fieldName.toString();

    };
    
    /** Pagination **/
    $scope.listMaxRow = [10,50,100,200,500];
    
    $scope.pagination = function(type){
        
        switch(type) {
            case "next":
                if($scope.record.p<($scope.getMaxData().length-1)){$scope.record.p=$scope.record.p+1;}
                break;
            case "prev":
                if($scope.record.p>0){$scope.record.p=$scope.record.p-1;}
                break;
            case "first":
                $scope.record.p=0;
                break;
            case "last":
                $scope.record.p=$scope.getMaxData().length-1;
                break;
            case "refresh":
                $scope.record.p=0;
                $scope.record.o=$scope.properties.columnKey[0];
                $scope.record.reverseSort=false;
                break;
        }
        
        /** BDM API **/
        var apiDataUrl = "../API/bdm/businessData/"+$scope.properties.businessData+"?q="+$scope.properties.queryName+"&p="+$scope.record.p+"&c="+$scope.record.c+$scope.filters.toString();
        var apiCountUrl = "../API/bdm/businessData/"+$scope.properties.businessData+"?q=countFor"+capitalizeFirstLetter($scope.properties.queryName)+"&p=0&c=1"+$scope.filters.toString();
        
        /** Load Data **/
        loadData(apiDataUrl);
        countData(apiCountUrl);

    };
    
    $scope.getCurrentStat = function(){
        var from = ($scope.record.p*$scope.record.c)+1;
        if($scope.record.p===0){from=1;}
        else if(from>$scope.totalData){from=$scope.totalData;}
        
        var end = (($scope.record.p+1)*$scope.record.c);
        if($scope.record.p===0){end=($scope.record.p+1)*$scope.record.c;}
        else if(end>$scope.totalData){end=$scope.totalData;}
        
        return String('Showing ' + from.toString() + ' to ' + end.toString() + ' of ' + $scope.totalData.toString() + ' rows');
    };
    
    $scope.getMaxData = function(){
        return new Array(Math.ceil($scope.totalData/$scope.record.c));
    };
    
    $scope.getListPage = function(){
        
        var i=0;
        var listPage = [];
        var page=0;
        var maxPage = Math.round($scope.totalData/$scope.record.c);
        for(i=1;i<=5;i++){
        
            if($scope.record.p<=2){
                if(i<=maxPage){listPage.push(i);}
            }   
            else if($scope.record.p>2){
                
                if($scope.record.p<maxPage){}
                else if($scope.record.p>maxPage){$scope.record.p=maxPage;}
                    
                if(listPage.length===0){
                    page=$scope.record.p-1;
                    listPage.push(page);
                }
                else if(page<maxPage){
                    page=page+1;
                    listPage.push(page);
                }
            }
        }
        return listPage;
            
    };
    
    
    /** Modal **/
    $scope.isModal = false;
    $scope.modal="";
    $scope.dataRow = "";
    
    $scope.clickModal = function(modal,data){
        $scope.dataRow = data;
        $scope.modal = modal;
        $scope.isModal = !$scope.isModal;
        
    };
    
    
    /** Delete Function **/
    $scope.deleteRow = function(pid){
        $http.post($scope.urlDelete,{'pid':pid,'businessData':$scope.properties.businessData})
            .then(function(response) {
            $scope.isDelete=!$scope.isDelete;
            window.location.reload();
        });
    };
    
    /** Url for add row data **/
    var apiUrlAdd = "../API/bpm/process?o=version&f=name="+encodeURI($scope.properties.processAdd);
    $http.get(apiUrlAdd)
        .then(function(response) {
    
        var process = response.data[0];
    
        $scope.urlAdd = "/bonita/portal/resource/process/"+ encodeURI(process.name) +"/" + process.version + "/content/?id=" + process.id +"&senderUrl="+ window.top.location.href+"&";
    });
    
    /** Url for edit row data **/
    var apiUrlEdit = "../API/bpm/process?o=version&f=name="+encodeURI($scope.properties.processEdit);
    $http.get(apiUrlEdit)
        .then(function(response) {
    
        var process = response.data[0];
    
        $scope.urlEdit = "/bonita/portal/resource/process/"+ encodeURI(process.name) +"/" + process.version + "/content/?id=" + process.id +"&senderUrl="+ window.top.location.href+"&";
    });
    
    /** Url for delete row data **/
    var apiUrlDelete = "../API/bpm/process?o=version&f=name="+encodeURI("SYS_DeleteData");
    $http.get(apiUrlDelete)
        .then(function(response) {
    
        var process = response.data[0];
        
        $scope.urlDelete = "../API/bpm/process/"+process.id+"/instantiation";
    }); 
}
,
      template: '<!DOCTYPE HTML>\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<!-- Modal -->\n    <!-- Show Image -->\n    <div class="container Modal-overlay" ng-if="isModal && modal==\'image\'">\n        <div class="row">\n            <div class="col-xs-12">\n                <a href="#" ng-click="clickModal(\'\',\'\')" class="pull-right">\n                  <font color="#fff" size="4">Close <span class="fas fa-times-circle"></span></font>\n                </a>\n            </div>\n        </div>\n        <br/>\n        <div class="row">\n            <div class="col-xs-1">\n            </div>\n            <div class="col-xs-10">\n                <center>\n                    <img ng-src="/bonita/portal/formsDocumentImage?document={{dataRow}}" class="show img-thumbnail">\n                </center>\n            </div>\n            <div class="col-xs-1">\n            </div>\n        </div>\n    </div>\n\n    <!-- Show Delete -->\n    <div class ="visible-lg visible-md Modal-overlay" ng-if="isModal && modal==\'delete\'">\n        <div class="container Modal-content">\n        <h4><b>Delete Confirmation</b></h4>\n        <hr/>\n        <div style="overflow:visible;">\n            <h4>Are you sure you want to delete this data ? </h4><br/>\n            <div class="container" ng-repeat="column in properties.columnKey track by $index">\n                <div class="col-xs-4"><b>{{properties.header[$index]}}</b></div>\n            	<div class="col-xs-8">\n            	    <div ng-if="properties.columnImage.indexOf(column)>=0 && (dataRow[column]!=null && dataRow[column]!=\'\')">\n                        <img src="/bonita/portal/formsDocumentImage?document={{dataRow[column]}}" class="img-thumbnail" width="10%">\n                    </div>\n                    <div ng-if="properties.columnImage.indexOf(column)>=0 && (dataRow[column]==null || dataRow[column]==\'\')">\n                        -\n                    </div>\n                    <div ng-if="properties.columnImage.indexOf(column)<0">{{$eval(column, dataRow) | uiTranslate}}</div>\n            	</div>\n           </div>\n            <hr/>\n            <div class="col-sm-6" align="left">\n                <button class="btn btn-danger" ng-click="clickModal(\'\',\'\')">No</button>\n            </div>\n            <div class="col-sm-6" align="right">    \n                <button class="btn btn-primary" ng-click="deleteRow(dataRow.persistenceId)">Yes</button>\n            </div>\n        </div>\n    </div>\n    </div>\n<!-- Search Field -->\n<div>\n    <input type="text" class="form-control" ng-model="record.s" placeholder="Search">\n</div>\n<br/>\n\n<!-- Add Row -->\n<div ng-if="properties.isAction">\n    <a href="{{urlAdd}}" target="_self" class="btn btn-sm btn-{{properties.style}}"><i class="fas fa-plus-circle"></i> Add</a>\n</div>\n\n<!-- Table Data For Laptop / PC / Tab -->\n<div class="visible-lg visible-md">\n    \n    <!-- Pagination -->\n    <div ng-if="collection.length>0">\n        <div class="col-xs-6" align="left">\n            <div>{{getCurrentStat()}}\n                <select class="btn btn-sm btn-{{properties.style}}" ng-model="record.c" ng-click="pagination(\'refresh\')">\n                    <option ng-repeat="maxRow in listMaxRow" value="{{maxRow}}">{{maxRow}}</option>\n                </select>\n                rows per page\n            </div>\n        </div>\n        <div class="col-xs-6" align="right" ng-if="totalData>(record.c | number)">\n            <div class="btn-group">\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==0 ? \'disabled\' : \'\'}}" ng-click="pagination(\'first\')">First</button>\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==0 ? \'disabled\' : \'\'}}" ng-click="pagination(\'prev\')">Prev</button>\n                <button ng-repeat="page in getListPage() track by $index" class="btn btn-sm btn-{{properties.style}} {{page==record.p+1 ? \'disabled\': \'\'}}" ng-click="record.p=page-1;pagination(\'\');">{{page}}</button>\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==(getMaxData().length)-1 ? \'disabled\' : \'\'}}" ng-click="pagination(\'next\')">Next</button>\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==(getMaxData().length)-1 ? \'disabled\' : \'\'}}" ng-click="pagination(\'last\')">Last</button>\n            </div>\n        </div>\n    </div>\n    <br/>\n    \n    <!-- Table Data -->\n    <table class="table table-striped">\n    	<thead>\n    	<tr>\n    		<th ng-repeat="row in properties.header track by $index">\n    		    <a href="#" ng-click="sortBy(properties.columnKey[$index])">{{row}} <span ng-if="record.o == properties.columnKey[$index]"><span class="glyphicon glyphicon-triangle-top" ng-if="!record.reverseSort"></span><span class="glyphicon glyphicon-triangle-bottom" ng-if="record.reverseSort"></span></span></a></th>\n        	<th ng-if="properties.isAction">\n        	    Actions\n        	</th>\n    	</tr>   \n    	</thead>\n    	<tbody>\n    	    <tr ng-repeat="row in collection | filter : record.s | orderBy : record.o : record.reverseSort track by $index">\n                <td ng-repeat="column in properties.columnKey track by $index">\n                    <div ng-if="properties.columnImage.indexOf(column)>=0 && (row[column]!=null && row[column]!=\'\')">\n                        <a href="#" ng-click="clickModal(\'image\',row[column])"><img src="/bonita/portal/formsDocumentImage?document={{row[column]}}" class="thumbnail"></a>\n                    </div>\n                    <div ng-if="properties.columnImage.indexOf(column)>=0 && (row[column]==null || row[column]==\'\')">\n                        -\n                    </div>\n                    <div ng-if="properties.columnImage.indexOf(column)<0">{{$eval(column, row) | uiTranslate}}</div>\n                    \n                </td>\n                <td>\n                    <div ng-if="properties.isAction">\n                        <a ng-if= "properties.urlOverview.length>0" href ="{{properties.urlOverview}}?pid={{row.persistenceId}}" target="_self" class="btn btn-sm btn-primary" ><i class="far fa-eye"></i></a>\n                        <a type="button" href="{{urlEdit}}pid={{row.persistenceId}}" target="_self" class="btn btn-sm btn-warning" ><i class="far fa-edit"></i></a>\n                        <button type="button" class="btn btn-sm btn-danger" ng-click="clickModal(\'delete\',row)"><i class="fas fa-eraser"></i></button>\n                    </div>\n                </td>\n            </tr>\n    	</tbody>\n    </table>\n</div>\n\n<!-- Feed Data For Mobile Devices -->\n<div class="visible-sm visible-xs" ng-if="collection.length>0">\n    \n    <!-- Pagination -->\n    <div class="container">\n        <div>\n            <div>{{getCurrentStat()}}\n                <select class="btn btn-sm btn-{{properties.style}}" ng-model="record.c" ng-click="pagination(\'refresh\')">\n                    <option ng-repeat="maxRow in listMaxRow" value="{{maxRow}}">{{maxRow}}</option>\n                </select>\n                rows per page\n            </div>\n        </div>\n        <br/>\n        <div ng-if="totalData>(record.c | number)">\n            <div class="btn-group">\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==0 ? \'disabled\' : \'\'}}" ng-click="pagination(\'first\')">First</button>\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==0 ? \'disabled\' : \'\'}}" ng-click="pagination(\'prev\')">Prev</button>\n                <button ng-repeat="page in getListPage() track by $index" class="btn btn-sm btn-{{properties.style}} {{page==record.p+1 ? \'disabled\': \'\'}}" ng-click="record.p=page-1;pagination(\'\');">{{page}}</button>\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==(getMaxData().length)-1 ? \'disabled\' : \'\'}}" ng-click="pagination(\'next\')">Next</button>\n                <button class="btn btn-sm btn-{{properties.style}} {{record.p==(getMaxData().length)-1 ? \'disabled\' : \'\'}}" ng-click="pagination(\'last\')">Last</button>\n            </div>\n        </div>\n    </div>\n    <br/>\n    <!-- Row Data -->\n    <table class="table table-striped">\n        <tbody>\n            <tr ng-repeat="row in collection">\n            <td >\n                <div class="container" ng-repeat="column in properties.columnKey track by $index">\n                    <div class="col-xs-4"><b>{{properties.header[$index]}}</b></div>\n                	<div class="col-xs-8">\n                        <span ng-if="properties.columnImage.indexOf(column)>=0 && (row[column]!=null && row[column]!=\'\')">\n                            <a href="#" ng-click="clickModal(\'image\',row[column])"><img src="/bonita/portal/formsDocumentImage?document={{row[column]}}" class="thumbnail"></a>\n                        </span>\n                        <span ng-if="properties.columnImage.indexOf(column)>=0 && (row[column]==null || row[column]==\'\')">\n                           : -\n                        </span>\n                        <span ng-if="properties.columnImage.indexOf(column)<0">: {{$eval(column, row) | uiTranslate}}</span>\n                    </div>\n                </div>\n                <div class="container" ng-if="properties.isAction">\n                    <div class="col-xs-4"><b>Actions</b></div>\n                	<div class="col-xs-8">\n                        <a ng-if= "properties.urlOverview.length>0" href ="{{properties.urlOverview}}?pid={{row.persistenceId}}" target="_self" class="btn btn-sm btn-primary" ><i class="far fa-eye"></i></a>\n                        <a type="button" href="{{urlEdit}}pid={{row.persistenceId}}" target="_self" class="btn btn-sm btn-warning" ><i class="far fa-edit"></i></a>\n                        <button type="button" class="btn btn-sm btn-danger {{isModal ? \'disabled\' : \'\'}}" ng-click="clickModal(\'delete\',collection[$index])"><i class="fas fa-eraser"></i></button>\n                    </div>\n                </div>\n                <div class="container" ng-if="isModal && dataRow==row">\n                    <hr/>\n                    <center><h5>Do you want to delete this data ?</h5></center>\n                    <div class="container col-xs-12">    \n                        <div class="col-xs-6" align="left">\n                            <button class="btn btn-danger pull-left" ng-click="clickModal(\'\',\'\')">No</button>\n                        </div>\n                        <div class="col-xs-6" align="right">    \n                            <button class="btn btn-primary pull-right" ng-click="deleteRow(dataRow.persistenceId)">Yes</button>\n                        </div>\n                    </div>\n                </div>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n    <hr/>\n</div>\n<div ng-if="collection.length==0">\n        <br/><i>No records found</i>\n</div>'
    };
  });
