(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customFieldDisplay', function() {
    return {
      template: '<!-- The custom widget template is defined here\n   - You can use standard HTML tags and AngularJS built-in directives, scope and interpolation system\n   - Custom widget properties defined on the right can be used as variables in a templates with properties.newProperty\n   - Functions exposed in the controller can be used with ctrl.newFunction()\n   - You can use the \'environment\' property injected in the scope when inside the Editor whiteboard. It allows to define a mockup\n     of the Custom Widget to be displayed in the whiteboard only. By default the widget is represented by an auto-generated icon\n     and its name (See the <span> below).\n-->\n \n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div class="row">\n    <div class="form-group" ng-if="properties.labelPosition!=\'top\'">\n        <div class="control-label col-sm-{{properties.labelWidth}}"><p align="{{properties.labelPosition}}"><b>{{properties.label}}</b></p></div>\n        <div class="col-sm-{{12-properties.labelWidth}}">{{properties.value}}</div>\n    </div>\n    <div class="form-group" ng-if="properties.labelPosition==\'top\'">\n        <div class="col-sm-12"><b>{{properties.label}}</b></div>\n        <div class="col-sm-12">{{properties.value}}</div>\n    </div>\n</div>'
    };
  });
