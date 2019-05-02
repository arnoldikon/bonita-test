(function () {
  try {
    return angular.module('bonitasoft.ui.widgets');
  } catch(e) {
    return angular.module('bonitasoft.ui.widgets', []);
  }
})().directive('customAngularChartjs', function() {
    return {
      controllerAs: 'ctrl',
      controller: function($scope){
    
    // Colour Series
    if($scope.properties.colorSeries=="Series 1"){
        $scope.colorSeries=['#3599B8','#8AD4EB','#A66999','#01B8AA','#F2C80F','#949FB1','#FD625E'];
    }
    if($scope.properties.colorSeries=="Series 2"){
        $scope.colorSeries=['#4AC5B8','#5F686D','#FB8281','#F4D25A','#7F898A','#A4DDEE','#FDAB89'];
    }
    if($scope.properties.colorSeries=="Series 3"){
        $scope.colorSeries=["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"];
    }
    if($scope.properties.colorSeries=="Series 4"){
        $scope.colorSeries=['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce','#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a'];
    }
    if($scope.properties.colorSeries=="Series 5"){
        $scope.colorSeries=['#535AD7','#FF402C','#83BFFF','#6EDB8F,','#FFE366'];
    }
    if($scope.properties.colorSeries=="Series 6"){
        $scope.colorSeries=['#FFC266','#D284BD','#878$DB','#FF7B65','#CAEEFC'];
    }
    if($scope.properties.colorSeries=="Series 7"){
        $scope.colorSeries=['#9ADBAD','#FFF1B2','#FFE0B2','#FFBEB2','#B1AFDB'];
    }
    
    
    else{}
    
    var x=[];
    var y=[];
    if($scope.properties.type=="bar"){
        x=[{
            position: 'bottom',
            ticks: {
                min: 1,
                max: $scope.properties.labels.length
            },
            scaleLabel: {
                display: true,
                labelString: $scope.properties.xLabel
            }
                
        }];
        y=[{
            ticks: {
                callback: function(label){
                return formatNumber(label);
                }
            },
            scaleLabel: {
                display: true,
                labelString: $scope.properties.yLabel
                }
            }
        ];
    }
    else if($scope.properties.type=="horizontalBar"){
        x=[{
            position: 'bottom',
            ticks: {
                callback: function(label){
                return formatNumber(label);
                }
            },
            scaleLabel: {
                display: true,
                labelString: $scope.properties.xLabel
            }
        }];
        y=[{
            scaleLabel: {
                display: true,
                labelString: $scope.properties.yLabel
                }
            }
        ];
    }
    
    if($scope.properties.series.length==1 && $scope.properties.type=="bar" || $scope.properties.type=="horizontalBar" || $scope.properties.type=="line"){
        $scope.legend=false;
        
    } 
    else{
        $scope.legend=$scope.properties.legend;
    }
    
    //Options
    $scope.options = {
        //Legend
        legend: {
            display: $scope.legend,
            position :$scope.properties.position
        },
        //Tooltips
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function(tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return label + ': ' + formatNumber(datasetLabel) ;
                }
            }
        },
        //Scales
        scales: {
            
            //X-Axis
            xAxes: x,
            //Y-Axis
            yAxes:y
        }
            
    };
},
      template: '<!DOCTYPE HTML>\n<span ng-if="environment"><identicon name="{{environment.component.id}}" size="30" background-color="[255,255,255, 0]" foreground-color="[51,51,51]"></identicon> {{environment.component.name}}</span>\n\n<div>\n    <canvas class="chart-base" chart-type="properties.type" chart-data="properties.data" chart-labels="properties.labels" chart-series="properties.series" chart-options="options" chart-colors="colorSeries"></canvas>\n</div>'
    };
  });
