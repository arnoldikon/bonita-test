(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customPanel', function() {
    return {
      controllerAs: 'ctrl',
      controller: function ($scope) {

},
      template: '<!DOCTYPE HTML>\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div class="{{\'panel panel-\'+properties.style}}">\n  <div ng-if="properties.showTitle" class="panel-heading">\n      <p ng-bind-html="properties.title"></p>\n  </div>\n  <div ng-if="properties.showBody" class="panel-body">\n      <p ng-bind-html="properties.body"></p>\n  </div>\n  <div ng-if="properties.showFooter" class="panel-footer">\n      <p ng-bind-html="properties.footer"></p>\n  </div>\n</div>'
    };
  });
