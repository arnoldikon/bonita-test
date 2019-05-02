(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customCameraCapture', function() {
    return {
      controllerAs: 'ctrl',
      controller: function($scope) {
    var _video = null,
        patData = null;
    
    $scope.isShow = false;
    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.channel = {};

    $scope.webcamError = false;
    $scope.onError = function (err) {
        $scope.$apply(
            function() {
                $scope.webcamError = err;
            }
        );
    };

    $scope.onSuccess = function () {
        // The video element contains the captured camera data
        _video = $scope.channel.video;
        $scope.$apply(function() {
            $scope.patOpts.w = _video.width;
            $scope.patOpts.h = _video.height;
            
            //$scope.showDemos = true;
        });
    };

    $scope.onStream = function (stream) {
        // You could do something manually with the stream.
    };

	$scope.makeSnapshot = function() {
        if (_video) {
            var patCanvas = document.querySelector('#snapshot');
            if (!patCanvas) return;

            patCanvas.width = _video.width;
            patCanvas.height = _video.height;
            
            var ctxPat = patCanvas.getContext('2d');

            var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
            ctxPat.putImageData(idata, 0, 0);

            sendSnapshotToServer(patCanvas.toDataURL());

            patData = idata;
            
            $scope.properties.snapshotData = $scope.snapshotData.toString();
            $scope.isShow = false;

        }
    };
    
    /**
     * Redirect the browser to the URL given.
     * Used to download the image by passing a dataURL string
     */
    $scope.downloadSnapshot = function downloadSnapshot() {
        var download = $scope.properties.snapshotData.toString().replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
        window.location.href=download;

    };
    
    var getVideoData = function getVideoData(x, y, w, h) {
        var hiddenCanvas = document.createElement('canvas');
        hiddenCanvas.width = _video.width;
        hiddenCanvas.height = _video.height;
        var ctx = hiddenCanvas.getContext('2d');
        ctx.drawImage(_video, 0, 0, _video.width, _video.height);
        return ctx.getImageData(x, y, w, h);
    };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
        $scope.snapshotData = imgBase64;
    };
},
      template: '<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div class="alert alert-error ng-scope" ng-show="webcamError" style="">\n    <span>Webcam could not be started. Did you give access to it?</span>\n</div>\n<div>\n    <button class="btn btn-primary" ng-click=\'isShow=!isShow;properties.snapshotData=null;\'><i class="glyphicon glyphicon-camera"></i> {{properties.label}}</button>\n</div>\n<br/>\n\n<div ng-if=\'isShow\' class="Modal-overlay">\n    <center>\n        <webcam channel="channel" \n            on-streaming="onSuccess()" \n            on-error="onError(err)" \n            on-stream="onStream(stream)">\n        </webcam>\n        <button class="btn btn-primary" ng-click="makeSnapshot()"><i class="glyphicon glyphicon-camera"></i> Capture</button>\n    </center>\n</div>\n<div>\n    <canvas id="snapshot" height=\'300\' width=\'300\'></canvas>\n</div>'
    };
  });
