def static CreateHistoryData(businessData,newHashMapData,oldHashMapData,pid,pidVersion){
	
	def listHist = []
	
	newHashMapData.each{ newData ->
		def histData = [ 
			"businessData"	: businessData.toString(),
			"columnName"	: newData.key.toString(),
			"newValue"		: newData.value.toString(),
			"oldValue"		: "",
			"pid" 			: pid,
			"pidVersion"	: pidVersion
			]
			
		if(oldHashMapData != null){
			
			oldHashMapData.each{ oldData ->
				
				if(histData.columnName == oldData.key.toString()){
					histData.oldValue = oldData.value.toString()
					listHist << histData
				}
			}
		}
		
		else{listHist << histData}
		
	}
	return listHist
}