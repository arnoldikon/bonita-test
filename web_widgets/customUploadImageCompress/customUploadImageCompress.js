(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customUploadImageCompress', function() {
    return {
      template: '<!DOCTYPE HTML>\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div>\n<b>Image File</b>\n</div>\n<div>\n<input type="file" accept="image/*" image="properties.imageOutput" resize-max-height="{{properties.maxHeight | number}}" resize-max-width="{{properties.maxWidth | number}}" resize-quality="{{properties.quality | number}}" resize-type="image/jpg" ng-image-compress />\n<span ng-if="properties.imageOutput!=null">\n    <h5>Preview</h5>\n    <img ng-src="{{properties.imageOutput.compressed.dataURL}}" />    \n</span>\n</div>'
    };
  });
