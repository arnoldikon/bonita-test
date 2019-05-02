(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customPrevNextButton', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope) {
    
},
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div class="row" align="right">\n    <div class="col-xs-12 ng-scope">\n        <i>Page {{properties.record.p+1}}</i>\n    </div>\n</div>\n<div class="row">\n    <div class="col-xs-6 ng-scope" align="right">\n        <button ng-if="properties.record.p>0" class="btn btn-{{properties.style}}" ng-click="properties.record.p=properties.record.p-1"><span class="glyphicon glyphicon-chevron-left"></span> Prev</button>\n    </div>\n    <div class="col-xs-6 ng-scope">\n        <button ng-if="!(properties.totalData<properties.record.c)" class="btn btn-{{properties.style}}" ng-click="properties.record.p=properties.record.p+1">Next <span class="glyphicon glyphicon-chevron-right"></span></button>\n    </div>\n</div>'
    };
  });
