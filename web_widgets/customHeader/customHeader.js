(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customHeader', function() {
    return {
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div>\n    <h3><b><i class="{{properties.iconClass}}"></i> {{properties.header | uppercase}}</b></h3>\n    <span ng-if="properties.subHeader!==null && properties.subHeader!==\'\'"><i>{{properties.subHeader}}<br/></i></span>\n    <hr/>\n</div>'
    };
  });
