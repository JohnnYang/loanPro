$(function() {
	//以下代码主要处理复选框的其他和横线
	var houseProperArr = $("#hideHouseProper").val().split(',')
	var vocationArr = $("#hideVocation").val().split(',')
	var knowUsWaysArr = $("#hideKnowUsWays").val().split(',')

	var knowUsWaysOther = $("#hideKnowUsWaysOther").val()
	var vocationOther = $("#hideVocationOther").val()
	var houseProperYue = $("#hideHouseProperYue").val()

	var knowUsWaysText = loopArr(knowUsWaysArr,'其他',knowUsWaysOther);
	if(knowUsWaysText != "undefined" && knowUsWaysText != null && knowUsWaysText != ''){
		$('.knowUsWays').text('您是通过什么渠道了解到我们的服务的?    ' + knowUsWaysText);
	}
	else{
		$('.knowUsWays').text('您是通过什么渠道了解到我们的服务的?    ');
	}
	
	var vocationText = loopArr(vocationArr,'其他',vocationOther);
	if(vocationText != "undefined" && vocationText != null && vocationText != ''){
		$('.vocation').text('行业：' + vocationText);
	}
	else{
		$('.vocation').text('行业：');
	}
	
	var houseProperText = loopHouse(houseProperArr,'租用',houseProperYue);
	if(houseProperText != "undefined" && houseProperText != null && houseProperText != ''){
		$('.houseProper').text('现住房性质：' + houseProperText);
	}
	else{
		$('.houseProper').text('现住房性质：');
	}

	function loopArr(arr,para1,para2){
		for(var i=0; i<arr.length; i++){
			if(arr[i] == para1){
				arr[i] +='（' + para2 + '）';
			}
		}
		return arr.join(',');
	}

	function loopHouse(arr,para1,para2){
		for(var i=0; i<arr.length; i++){
			if(arr[i] == para1){
				arr[i] += '(期限: ' + para2 + '月)';
			}
		}
		return arr.join(',');
	}
})
