/** Filter Label From Code **/
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
}

/** Filter Refer From Label **/
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
}

/** Filter Group **/
function findGrup(val,options) {
    var result = "";
    var i = 0;
    for(i=0;i<options.length;i++){
        if(val==options[i].code){
            result = options[i].groupCode;
            return result;
        }
        else;
    }
}

/** Format Date Time **/
function formatDateTime(dateIn,format){
    var result = "";
    
    if(dateIn===null){
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
    
    if(format=="d/M/y"){
        result = dates + "/" + month + "/" + year;
    }
    else if(format=="y/M/d"){
        result = year + "/" + month + "/" + dates;
    }
    else{
        result = month + "/" + dates + "/" + year;
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
    
    result = result + " | " + hour + ":" + minutes + ":" + second;
    
    return result;
}

/** Format Date **/
function formatDate(dateIn,format){
    var result = "";
    
    if(dateIn===null){
        return result;
    }
    var dateInput = new Date(dateIn);
    
    //Format Date
    var year = dateInput.getFullYear().toString();
    var month = (dateInput.getMonth()+1).toString();
    var dates = dateInput.getDate().toString();
    
    if(format=="d/M/y"){
        result = dates + "/" + month + "/" + year;
    }
    else if(format=="y/M/d"){
        result = year + "/" + month + "/" + dates;
    }
    else{
        result = month + "/" + dates + "/" + year;
    }
    
    return result;
}

/** Format Number **/
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
}

/** Current Period **/
function curPeriod(){
	var curDate = new Date();
	curDate.setMonth(curDate.getMonth()-1);
	var month = (curDate.getMonth()+1).toString();
	if(month.length!=2){month = "0" + month;}
	var period = curDate.getFullYear().toString() + month;
	return period;
}

/** Get URL Process **/
function getURLProcess(listProcess){
    
    var listProcessData = [];
    
    if(listProcess.length>0){
        
        for(i=0;i<listProcess.length;i++){
            var process = listProcess[i];
            
            if(process.name.includes("SYS")){}
            else{
                listProcessData.push(
                    {
                        "name":process.name,
                        "displayName":process.displayName,
                        "displayDescription":process.displayDescription,
                        "version":process.version,
                        "processURL":"/bonita/portal/resource/process/"+ encodeURI(process.name) +"/" + process.version + "/content/?id=" + process.id +"&senderUrl="+ window.top.location.href
                    });
            }
        }
    }
    
    return listProcessData;
}

/** Cek File **/
function cekFile(docType,contentType){
	
	if(contentType.length===0 || contentType===null){return true}
	else{
		var allowedType = [];
		
		if(docType == "attachment"){allowedType = ["application/pdf","image/png","image/jpeg"]}
		else if(docType == "data"){allowedType = ["text/csv","text/plain","application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
		else if(docType == "image"){allowedType = ["image/png","image/jpeg"]}
		else if(docType == "pdf"){allowedType = ["application/pdf"]}
		
		if(allowedType.indexOf(contentType) >= 0){return true}
		else{return false}
	}
}

/** Remove Duplicates **/
function removeDuplicates(arr,type,uniqueKey){
   let unique_array = [];
    if(type=="list"){
        for(let i = 0;i < arr.length; i++){
            if(unique_array.indexOf(arr[i]) == -1){
                unique_array.push(arr[i]);
            }
        }
        return unique_array;
    }
    else if(type=="listMap"){
        var listArray = [];
        for(let i = 0;i < arr.length; i++){
            
            if(listArray.indexOf(arr[i][uniqueKey])<0){
                unique_array.push(arr[i]);
            }
            listArray.push(arr[i][uniqueKey]);
            
        }
        return unique_array;
    }
}

/** Get Document **/
function getDocument(contentStorageId){
    return "/bonita/portal/formsDocumentImage?document="+contentStorageId.toString();
}

/** Generate Random Password **/
function randPassword(letters, numbers, either) {
  var chars = [
   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", // letters
   "0123456789", // numbers
   "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789" // either
  ];

  return [letters, numbers, either].map(function(len, i) {
    return Array(len).fill(chars[i]).map(function(x) {
      return x[Math.floor(Math.random() * x.length)];
    }).join('');
  }).concat().join('').split('').sort(function(){
    return 0.5-Math.random();
  }).join('');
}

/** Set Target URL **/
function setURL(senderURL,application){
    
    var baseURL = window.location.href;
    var URL = "";
    
    if(senderURL.length>0){URL=senderURL;}
    else{URL=baseURL;}
    
    return URL;
}