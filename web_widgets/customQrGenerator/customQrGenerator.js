(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customQrGenerator', function() {
    return {
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<qrcode error-correction-level="{{properties.level.substring(0, 1)}}" size="{{properties.size}}" data="{{properties.data}}"></qrcode>\n'
    };
  });
