(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customButtonGroup', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope) {

},
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<center>\n<div class="btn-group" role="group">\n  <button ng-repeat="label in properties.listLabel" type="button" class="btn btn-{{label==properties.onClick ? \'success\' : \'primary\'}}" ng-click="properties.onClick=label">{{label}}</button>\n</div>\n</center>'
    };
  });
