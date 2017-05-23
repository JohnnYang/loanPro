window.onload = function() {
	$('.del').click(function(e) {
		if(confirm("是否确认删除？")){
			var target = $(e.target)
			var id = target.data('id')
			var tr = $('.item-id-' + id)

			$.ajax({
				type: 'DELETE',
				url: '/?id=' + id
			})
			.done(function(results) {
				if(results.success === 1) {
					if(tr.length > 0) {
						tr.remove()
					}
				}
			})
		}
	})

	
	if($("#pagination")){
		var recordCount = $('#hideRecordCount').val() - 0;
		var onePageCount = 10;
		var currentPage = $('#hideCurrentPage').val() - 0;
		var counts = "";
		var pageHtml = "";
		var searchCondition = $('.inputSearch').val();

		if(recordCount%onePageCount == 0){
			counts = parseInt(recordCount/onePageCount);
		}else{
			counts = parseInt(recordCount/onePageCount) + 1;
		}
		//只有一页内容
		if(recordCount <= onePageCount){
			pageHtml = "";
		}
		//大于一页内容
		if(recordCount > onePageCount){
			if(currentPage > 1){
				pageHtml += '<li><a rel="external nofollow" href="/?pageNum=' + (currentPage-1) + '&searchCondition=' + searchCondition + '">上一页</a></li>';
			}
			for(var i=0; i<counts; i++){
				if(i >= (currentPage - 3) && i < (currentPage + 3)){
					if(i == currentPage - 1){
						pageHtml += '<li class="active"><a rel="external nofollow" href="/?pageNum=' + (i+1) + '&searchCondition=' + searchCondition + '">' + (i+1) + '</a></li>';
					}else{
						pageHtml += '<li><a rel="external nofollow" href="/?pageNum=' + (i+1) + '&searchCondition=' + searchCondition + '">' + (i+1) + '</a></li>';
					}
				}
			}
			if(currentPage < counts){
				pageHtml += '<li><a rel="external nofollow" href="/?pageNum=' + (currentPage+1) + '&searchCondition=' + searchCondition + '">下一页</a></li>';
			}
		}
		$("#pagination").html(pageHtml);
	}
};








/*$('.search').click(function(e){
		console.log('ooooooooo' + $('.searchForm').serialize())
		$.ajax({
            type: "POST",
            url:'/',
            data:$('.searchForm').serialize()
        })
        .done(function(results) {
        	$('.tableTbody tr').html('');
        	if(results.loans && results.loans.length > 0){
        		var loans = results.loans;
	        	for(var i=0; i<loans.length; i++){
	        		var appendHtml = '<td style={"word-wrap":"break-word"}>' + loans[i].loanName + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].busiProper + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].loanMoney + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].loanTime + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].lendingTime + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].lendingQuota + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].lendingSide + '</td>'
	                               +'<td style={"word-wrap":"break-word"}>' + loans[i].cusMger + '</td>'
	                               +'<td style={"text-align":"center"}>' + loans[i].meta.updateAt + '</td>'
	                               +'<td style={"text-align":"center"}>' + ' <a target="_blank" href="../loan/' + loans[i]._id + '"' + '>' + '查看' + '</a>' + '</td>'
	                               +'<td style={"text-align":"center"}>' + ' <a target="_blank" href="../update/' + loans[i]._id + '"' + '>' + '修改' + '</a>' + '</td>'
	                               +'<td style={"text-align":"center"}>' + ' <button onclick="deleteRecord()" class="ben btn-danger del" type="button" data-id=' + '"' + loans[i]._id + '"' + '>' + '删除' + '</button>' + '</td>'
	        		$('.item-id-' + loans[i]._id).append(appendHtml);  
	        	}         
        	}*/

        	/*for(var i=1; i<$('.table tr').length; i++){
        		var para = '.table ' + 'tr:eq(' + i + ')';
        		var innerText = $(para)[0].cells[0].innerText;
        		var flag = false;
        		for(var j=0; j<results.loans.length; j++){
        			if(innerText == results.loans[j].loanName){
        				flag = true; 
        			}
        		}
        		if(flag == false){
        			$(para).html('');
        		}
        	}*/
	/*	}) 
    })*/
