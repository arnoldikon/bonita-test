//Filter Label From Code
function findLabel(val,options) {
    var result = "";
    var i = 0;
    for(i=0;i<options.length;i++){
        if(val==options[i].code){
            result = options[i].label;
            return result;
        }
        else;
    }
};

//Filter Refer Form Label
function findReferLabel(val,options) {
    var result = "";
    var i = 0;
    for(i=0;i<options.length;i++){
        if(val==options[i].label){
            result = options[i].refer;
            return result;
        }
        else;
    }
};

//Filter Group
function findGrup(val,options) {
    var result = "";
    var i = 0;
    for(i=0;i<options.length;i++){
        if(val==options[i].code){
            result = options[i].grup;
            return result;
        }
        else;
    }
};

//Format Date
function formatDate(dateIn){
    var result = "";
    
    if(dateIn==null){
        return result;
    }
    var dateInput = new Date(dateIn);
    
    //Format Date
    var year = dateInput.getFullYear().toString();
    var month = (dateInput.getMonth()+1).toString();
    var dates = dateInput.getDate().toString();
    var hour = dateInput.getHours().toString();
    var minutes = dateInput.getMinutes().toString();
    var second = dateInput.getSeconds().toString();
    
    if(month.length!=2){
        month = "0" + month;
    }
    
    
    if(dates.length!=2){
        dates = "0" + dates;
    }
    
    
    if(hour.length!=2){ 
        hour = "0" + hour;
    }
    
    
    if(minutes.length!=2){ 
        minutes = "0" + minutes;
    }
    
    
    if(second.length!=2){ 
        second = "0" + second;
    }
    
    
    result = dates + "/" + month + "/" + year + " | " + hour + ":" + minutes + ":" + second;
    
    return result;
};

//Format Number
function formatNumber(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
    return x1 + x2;
};

//Current Period
function curPeriod(){
	var curDate = new Date();
	curDate.setMonth(curDate.getMonth()-1);
	var month = (curDate.getMonth()+1).toString();
	if(month.length!=2){month = "0" + month;}
	var period = curDate.getFullYear().toString() + month;
	return period;
};

//Get URL
function getURL(listProcess){
    if (listProcess && listProcess.length) {
        var process = listProcess[0];
        return "/bonita/portal/resource/process/"+ encodeURI(process.name) +"/" + process.version + "/content/?id=" + process.id +"&senderUrl="+ window.top.location.href;
    }
};
