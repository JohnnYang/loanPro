$(function() {
	//多选
	var busiProperArr = $("#hideBusiProper").val().split(',')
	var loanProductArr = $("#hideLoanProduct").val().split(',')
	var houseProperArr = $("#hideHouseProper").val().split(',')
	var maritalStatusArr = $("#hideMaritalStatus").val().split(',')
	var eduLevelArr = $("#hideEduLevel").val().split(',')
	var ownershipArr = $("#hideOwnership").val().split(',')
	var vocationArr = $("#hideVocation").val().split(',')
	var creditRecordArr = $("#hideCreditRecord").val().split(',')
	var knowUsWaysArr = $("#hideKnowUsWays").val().split(',')
	//单选
	var sexArr = $("#hideSex").val()
	//Table列
	var spouseName = $("#hideSpouseName").val()
	var spouseID = $("#hideSpouseID").val()
	var spouseUnit = $("#hideSpouseUnit").val()
	var spouseDuties = $("#hideSpouseDuties").val()
	var spousePhone = $("#hideSpousePhone").val()

	var otherName1 = $("#hideOtherName1").val()
	var otherRelation1 = $("#hideOtherRelation1").val()
	var otherUnit1 = $("#hideOtherUnit1").val()
	var otherLocation1 = $("#hideOtherLocation1").val()
	var otherPhone1 = $("#hideOtherPhone1").val()

	var otherName2 = $("#hideOtherName2").val()
	var otherRelation2 = $("#hideOtherRelation2").val()
	var otherUnit2 = $("#hideOtherUnit2").val()
	var otherLocation2 = $("#hideOtherLocation2").val()
	var otherPhone2 = $("#hideOtherPhone2").val()

	var otherName3 = $("#hideOtherName3").val()
	var otherRelation3 = $("#hideOtherRelation3").val()
	var otherUnit3 = $("#hideOtherUnit3").val()
	var otherLocation3 = $("#hideOtherLocation3").val()
	var otherPhone3 = $("#hideOtherPhone3").val()


	function checkChk(str1,arr){
		var str = "input[name='" + str1 + "']"
		$(str).each(function(){
		for(var i=0; i<arr.length; i++){
			if(arr[i] == $(this).val()){
				$(this).attr("checked",true)
			}
		}
		})
	}

	checkChk('busiProper',busiProperArr);
	checkChk('loanProduct',loanProductArr);
	checkChk('houseProper',houseProperArr);
	checkChk('maritalStatus',maritalStatusArr);
	checkChk('eduLevel',eduLevelArr);
	checkChk('ownership',ownershipArr);
	checkChk('vocation',vocationArr);
	checkChk('creditRecord',creditRecordArr);
	checkChk('knowUsWays',knowUsWaysArr);
	checkChk('sex',sexArr);

	$(".spouseName").text(spouseName)
	$(".spouseID").text(spouseID)
	$(".spouseUnit").text(spouseUnit)
	$(".spouseDuties").text(spouseDuties)
	$(".spousePhone").text(spousePhone)

	$(".otherName1").text(otherName1)
	$(".otherRelation1").text(otherRelation1)
	$(".otherUnit1").text(otherUnit1)
	$(".otherLocation1").text(otherLocation1)
	$(".otherPhone1").text(otherPhone1)

	$(".otherName2").text(otherName2)
	$(".otherRelation2").text(otherRelation2)
	$(".otherUnit2").text(otherUnit2)
	$(".otherLocation2").text(otherLocation2)
	$(".otherPhone2").text(otherPhone2)

	$(".otherName3").text(otherName3)
	$(".otherRelation3").text(otherRelation3)
	$(".otherUnit3").text(otherUnit3)
	$(".otherLocation3").text(otherLocation3)
	$(".otherPhone3").text(otherPhone3)
})

function preSubmit(){

	/*if($('input[name="busiProper"]').val() == 'undefined'){
		$('input[name="busiProper"]').val('');
	}

	$('input[name="busiProper"]').each(function(){
		if($(this).val() == 'undefined'){}
	})

	if($('input[name="loanProduct"]').val() == 'undefined'){
		$('input[name="loanProduct"]').val('');
	}
	if($('input[name="houseProper"]').val() == 'undefined'){
		$('input[name="houseProper"]').val('');
	}
	if($('input[name="maritalStatus"]').val() == 'undefined'){
		$('input[name="maritalStatus"]').val('');
	}
	if($('input[name="eduLevel"]').val() == 'undefined'){
		$('input[name="eduLevel"]').val('');
	}
	if($('input[name="ownership"]').val() == 'undefined'){
		$('input[name="ownership"]').val('');
	}
	if($('input[name="vocation"]').val() == 'undefined'){
		$('input[name="vocation"]').val('');
	}
	if($('input[name="creditRecord"]').val() == 'undefined'){
		$('input[name="creditRecord"]').val('');
	}
	if($('input[name="knowUsWays"]').val() == 'undefined'){
		$('input[name="knowUsWays"]').val('');
	}
	if($('input[name="sex"]').val() == 'undefined'){
		$('input[name="sex"]').val('');
	}*/
	//配偶相关数据获取
	var spouseName = $(".spouseName").text()
	var spouseID = $(".spouseID").text()
	var spouseUnit = $(".spouseUnit").text()
	var spouseDuties = $(".spouseDuties").text()
	var spousePhone = $(".spousePhone").text()
	//配偶数据赋值给隐藏控件，用于存库
	$("#hideSpouseName").val(spouseName)
	$("#hideSpouseID").val(spouseID)
	$("#hideSpouseUnit").val(spouseUnit)
	$("#hideSpouseDuties").val(spouseDuties)
	$("#hideSpousePhone").val(spousePhone)

	//其他人1相关数据获取
	var otherName1 = $(".otherName1").text()
	var otherRelation1 = $(".otherRelation1").text()
	var otherUnit1 = $(".otherUnit1").text()
	var otherLocation1 = $(".otherLocation1").text()
	var otherPhone1 = $(".otherPhone1").text()
	//其他人1数据赋值给隐藏控件，用于存库
	$("#hideOtherName1").val(otherName1)
	$("#hideOtherRelation1").val(otherRelation1)
	$("#hideOtherUnit1").val(otherUnit1)
	$("#hideOtherLocation1").val(otherLocation1)
	$("#hideOtherPhone1").val(otherPhone1)
	
	//其他人2相关数据获取
	var otherName2 = $(".otherName2").text()
	var otherRelation2 = $(".otherRelation2").text()
	var otherUnit2 = $(".otherUnit2").text()
	var otherLocation2 = $(".otherLocation2").text()
	var otherPhone2 = $(".otherPhone2").text()
	//其他人2数据赋值给隐藏控件，用于存库
	$("#hideOtherName2").val(otherName2)
	$("#hideOtherRelation2").val(otherRelation2)
	$("#hideOtherUnit2").val(otherUnit2)
	$("#hideOtherLocation2").val(otherLocation2)
	$("#hideOtherPhone2").val(otherPhone2)

	//其他人3相关数据获取
	var otherName3 = $(".otherName3").text()
	var otherRelation3 = $(".otherRelation3").text()
	var otherUnit3 = $(".otherUnit3").text()
	var otherLocation3 = $(".otherLocation3").text()
	var otherPhone3 = $(".otherPhone3").text()
	//其他人3数据赋值给隐藏控件，用于存库
	$("#hideOtherName3").val(otherName3)
	$("#hideOtherRelation3").val(otherRelation3)
	$("#hideOtherUnit3").val(otherUnit3)
	$("#hideOtherLocation3").val(otherLocation3)
	$("#hideOtherPhone3").val(otherPhone3)
}