var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var _ = require('underscore')
var Loan = require('./models/loan')
var nodeExcel = require('excel-export')
var port = process.env.PORT || 8888
var app = express()

//重点在这一句，赋值一个全局的承诺。
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/loan')

app.set('views', './views/pages')
app.set('view engine', 'jade')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('start on port ' + port)

var excelHeadName = ['序号','借款人姓名','借款人身份证号','业务性质','贷款金额(万元)','贷款期限(月)',
'贷款产品','贷款用途及还款来源','出生日期','性别','户籍所在地',
'在青居住年限','现居住地址','现住房性质','婚姻状况','家庭人数',
'移动电话','固定电话','其他联系方式','教育程度','工作单位',
'工作年限','职务','公司电话','配偶姓名','配偶身份证号码',
'配偶工作单位','配偶现有职务','配偶联系电话','家庭其他成员姓名1','与借款人的关系1',
'工作单位/现有职务1','现住址1','联系电话1','家庭其他成员姓名2','与借款人的关系2',
'工作单位/现有职务2','现住址2','联系电话2','家庭其他成员姓名3','与借款人的关系3',
'工作单位/现有职务3','现住址3','联系电话3','经营实体名称','经营产品',
'经营地址','经营年限','股权结构','员工人数','经营场地面积',
'管理层主要人员','管理层主要人员联系方式','最近两年总投资额','利润率','现阶段月均销售规模',
'上游主要客户','上游客户联系方式','下游主要客户','下游客户联系方式','行业',
'银行贷款(万元)','银行贷款(万元)保证方式','小贷公司和民间借款金额(万元)','小贷公司和民间借款金额保证方式','资产情况',
'资产负债率','征信记录','您是通过什么渠道了解到我们的服务的?','放款时间','批款额度',
'放款方','客户经理','备注','录入日期']

//进入主页操作——刷新操作，输入网址回车，换页操作。
app.get('/', function(req, res){
	var pageNum = 0;
	var searchCondition = null;
	if(req.query.pageNum != 'undefined' && req.query.pageNum != null && req.query.pageNum != ''){
		pageNum = req.query.pageNum - 0;
	}
	if(req.query.searchCondition != 'undefined' && req.query.searchCondition != null && req.query.searchCondition != ''){
		searchCondition = req.query.searchCondition;
	}
	var recordCount;

	if(pageNum >1 && searchCondition != null){
		var loanName = new RegExp(searchCondition)
    	Loan.searchName(loanName, function(err, loans) {
			if(err) {
				console.log(err)
			}
			recordCount = loans.length
			
			Loan.fenzu(loanName, pageNum, function(err, loans) {
				if(err) {
					console.log(err)
				}
				res.render('index', {
					title: '××××××××××××',
					loans: loans,
					recordCount: recordCount,
					searchCondition: searchCondition,
					currentPage: pageNum
				})
			})
		})
	}
	else if(pageNum >1 && searchCondition == null){
		Loan.fetch(function(err, loans) {
			if(err) {
				console.log(err)
			}
			recordCount = loans.length;
			
			Loan.fenzu(null, pageNum, function(err, loans) {
				if(err) {
					console.log(err)
				}
				
				res.render('index', {
					title: '××××××××××××',
					loans: loans,
					recordCount: recordCount,
					searchCondition: '',
					currentPage: pageNum
				})
			})			
		})	
	}
	else if(pageNum == 1 && searchCondition != null){
		var loanName = new RegExp(searchCondition)
    	Loan.searchName(loanName, function(err, loans) {
			if(err) {
				console.log(err)
			}
			recordCount = loans.length

			Loan.fenzu(loanName, pageNum, function(err, loans) {
				if(err) {
					console.log(err)
				}
				res.render('index', {
					title: '××××××××××××',
					loans: loans,
					recordCount: recordCount,
					searchCondition: searchCondition,
					currentPage: pageNum
				})
			})
		})
		
	}
	else{
		Loan.fetch(function(err, loans) {
			if(err) {
				console.log(err)
			}
			recordCount = loans.length;
			
			Loan.fenzu(null, 1, function(err, loans) {
				if(err) {
					console.log(err)
				}
				res.render('index', {
					title: '××××××××××××',
					loans: loans,
					recordCount: recordCount,
					searchCondition: '',
					currentPage: 1
				})
			})
		})
	}
})

//Excel导出——分为全部的当前页，全部页，搜索条件的当前页，全部页
app.get('/Excel', function(req, res){
	console.log("req1===="+req.query.searchCondition+'===currentPage===='+req.query.currentPage)
	var pageNum = 0;
	var searchCondition = null;
	if(req.query.currentPage != 'undefined' && req.query.currentPage != null && req.query.currentPage != ''){
		pageNum = req.query.currentPage - 0;
	}
	if(req.query.searchCondition != 'undefined' && req.query.searchCondition != null && req.query.searchCondition != ''){
		searchCondition = req.query.searchCondition;
	}

	if(pageNum == 0 && searchCondition == null){
		Loan.fetch(function(err, loans) {
			if(err) {
				console.log(err)
			}
			exportExcel(loans);
		})
	}
	if(pageNum == 0 && searchCondition != null){
		var loanName = new RegExp(searchCondition)
			
		Loan.searchName(loanName, function(err, loans) {
			if(err) {
				console.log(err)
			}
			exportExcel(loans);
		})
	}
	if(pageNum > 0 && searchCondition == null){
		Loan.fenzu(searchCondition, pageNum, function(err, loans) {
			if(err) {
				console.log(err)
			}
			exportExcel(loans);
		})
	}
	if(pageNum > 0 && searchCondition != null){
		var loanName = new RegExp(searchCondition)
		Loan.fenzu(loanName, pageNum, function(err, loans) {
			if(err) {
				console.log(err)
			}
			console.log("loans========="+loans);
			console.log("loans========="+loans.length);
			exportExcel(loans);
		})
	}
	//导出Excel方法
	function exportExcel(loans){
		var conf ={};
		conf.stylesXmlFile = "styles.xml";
	    conf.name = "mysheet";
	    conf.cols = [];
	    for(var i=0; i<excelHeadName.length; i++){
	    	conf.cols[i] = {};
	    	conf.cols[i].caption = excelHeadName[i];
	    	conf.cols[i].type = 'string';
	    }

		conf.rows = [];
		for(var j=0; j<loans.length; j++){
			if(loans[j].knowUsWaysOther && loans[j].knowUsWaysOther != 'undefined' && loans[j].knowUsWaysOther != ''){
				loans[j].knowUsWays = loans[j].knowUsWays + '(' + loans[j].knowUsWaysOther + ')';
			}
			if(loans[j].vocationOther && loans[j].vocationOther != 'undefined' && loans[j].vocationOther != ''){
				loans[j].vocation = loans[j].vocation + '(' + loans[j].vocationOther + ')';
			}
			if(loans[j].houseProperYue && loans[j].houseProperYue != 'undefined' && loans[j].houseProperYue != ''){
				var arr = loans[j].houseProper.split(',');
				for(var k=0; k<arr.length; k++){
					if(arr[k] == '租用'){
						arr[k] += '(期限: ' + loans[j].houseProperYue + '月)';
					}
				}
				loans[j].houseProper = arr.join(',');
			}

			conf.rows[j] = [j+1+'',loans[j].loanName,loans[j].loanID,loans[j].busiProper,loans[j].loanMoney,loans[j].loanTime,loans[j].loanProduct,loans[j].loanUsing,
			loans[j].birthDate,loans[j].sex,loans[j].huji,loans[j].timeInQD,loans[j].location,
			loans[j].houseProper,loans[j].maritalStatus,loans[j].familyNum,loans[j].mobilePhone,loans[j].fixedPhone,
			loans[j].otherContact,loans[j].eduLevel,loans[j].workUnit,loans[j].workTime,loans[j].workDuties,
			loans[j].workPhone,loans[j].spouseName,loans[j].spouseID,loans[j].spouseUnit,loans[j].spouseDuties,
			loans[j].spousePhone,loans[j].otherName1,loans[j].otherRelation1,loans[j].otherUnit1,loans[j].otherLocation1,
			loans[j].otherPhone1,loans[j].otherName2,loans[j].otherRelation2,loans[j].otherUnit2,loans[j].otherLocation2,
			loans[j].otherPhone2,loans[j].otherName3,loans[j].otherRelation3,loans[j].otherUnit3,loans[j].otherLocation3,
			loans[j].otherPhone3,loans[j].busiName,loans[j].busiProduct,loans[j].busiAddress,loans[j].busiTime,
			loans[j].ownership,loans[j].workerNum,loans[j].busiArea,loans[j].mgtPerson,loans[j].mgtContact,
			loans[j].investAmount,loans[j].rate,loans[j].saleScale,loans[j].shangyou,loans[j].shangyouPhone,
			loans[j].xiayou,loans[j].xiayouPhone,loans[j].vocation,loans[j].bankLoan,loans[j].bankGuaran,
			loans[j].xiaoeLoan,loans[j].xiaoeGuaran,loans[j].assetSituation,loans[j].assetRatio,loans[j].creditRecord,
			loans[j].knowUsWays,loans[j].lendingTime,loans[j].lendingQuota,loans[j].lendingSide,loans[j].cusMger,
			loans[j].comment,loans[j].meta.updateAt.toLocaleDateString()];
		}

	  	var result = nodeExcel.execute(conf);
	  	res.setHeader('Content-Type', 'application/vnd.openxmlformats');
	  	res.setHeader("Content-Disposition", "attachment; filename=" + "Results.xlsx");
	  	res.end(result, 'binary');
	}
});

//某个记录的详情页
app.get('/loan/:id', function(req, res){
	var id = req.params.id

	if(id){
		Loan.findById(id, function(err, loan) {
			res.render('detail', {
				title: "××××××××××××",
				loan: loan
			})
		})
	}
})

//开始录入页，下面代码用来初始化
 app.get('/loanIn', function(req, res){
	res.render('loanIn', {
		title: '××××××××××××',
		loan: {
			_id: '',
			loanName: '',
			loanID: '',
			busiProper: '',
			loanMoney: '',
			loanTime: '',
			loanProduct: '',
			loanUsing: '',
			birthDate: '',
			sex: '',
			huji: '',
			timeInQD: '',
			location: '',
			houseProper: '',
			maritalStatus: '',
			familyNum: '',
			mobilePhone: '',
			fixedPhone: '',
			otherContact: '',
			eduLevel: '',
			workUnit: '',
			workTime: '',
			workDuties: '',
			workPhone: '',
			spouseName: '',
			spouseID: '',
			spouseUnit: '',
			spouseDuties: '',
			spousePhone: '',
			otherName1: '',
			otherRelation1: '',
			otherUnit1: '',
			otherLocation1: '',
			otherPhone1: '',
			otherName2: '',
			otherRelation2: '',
			otherUnit2: '',
			otherLocation2: '',
			otherPhone2: '',
			otherName3: '',
			otherRelation3: '',
			otherUnit3: '',
			otherLocation3: '',
			otherPhone3: '',
			busiName: '',
			busiProduct: '',
			busiAddress: '',
			busiTime: '',
			ownership: '',
			workerNum: '',
			busiArea: '',
			mgtPerson: '',
			mgtContact: '',
			investAmount: '',
			rate: '',
			saleScale: '',
			shangyou: '',
			shangyouPhone: '',
			xiayou: '',
			xiayouPhone: '',
			vocation: '',
			bankLoan: '',
			bankGuaran: '',
			xiaoeLoan: '',
			xiaoeGuaran: '',
			assetSituation: '',
			assetRatio: '',
			creditRecord: '',
			knowUsWays: '',
			lendingTime: '',
			lendingQuota: '',
			lendingSide: '',
			cusMger: '',
			comment: '',
			knowUsWaysOther: '',
			vocationOther: '',
			houseProperYue: ''
		}
	})
})

//录入页面保存信息操作
app.post('/loan/new', function(req, res) {
	var id = req.body._id
	var loanObj = req.body
	var _loan

	if (id !== 'undefined' && id !== '') {
		Loan.findById(id, function(err, loan) {
			if (err){
				console.log(err)
			}

			_loan = _.extend(loan, loanObj)
			_loan.save(function(err, loan) {
				if (err) {
					console.log(err)
				}

				res.redirect('/loan/' + loan._id)
			})
		})
	}
	else {
		_loan = new Loan({
			loanName: loanObj.loanName,
			loanID: loanObj.loanID,
			busiProper: loanObj.busiProper,
			loanMoney: loanObj.loanMoney,
			loanTime: loanObj.loanTime,
			loanProduct: loanObj.loanProduct,
			loanUsing: loanObj.loanUsing,
			birthDate: loanObj.birthDate,
			sex: loanObj.sex,
			huji: loanObj.huji,
			timeInQD: loanObj.timeInQD,
			location: loanObj.location,
			houseProper: loanObj.houseProper,
			maritalStatus: loanObj.maritalStatus,
			familyNum: loanObj.familyNum,
			mobilePhone: loanObj.mobilePhone,
			fixedPhone: loanObj.fixedPhone,
			otherContact: loanObj.otherContact,
			eduLevel: loanObj.eduLevel,
			workUnit: loanObj.workUnit,
			workTime: loanObj.workTime,
			workDuties: loanObj.workDuties,
			workPhone: loanObj.workPhone,
			spouseName: loanObj.spouseName,
			spouseID: loanObj.spouseID,
			spouseUnit: loanObj.spouseUnit,
			spouseDuties: loanObj.spouseDuties,
			spousePhone: loanObj.spousePhone,
			otherName1: loanObj.otherName1,
			otherRelation1: loanObj.otherRelation1,
			otherUnit1: loanObj.otherUnit1,
			otherLocation1: loanObj.otherLocation1,
			otherPhone1: loanObj.otherPhone1,
			otherName2: loanObj.otherName2,
			otherRelation2: loanObj.otherRelation2,
			otherUnit2: loanObj.otherUnit2,
			otherLocation2: loanObj.otherLocation2,
			otherPhone2: loanObj.otherPhone2,
			otherName3: loanObj.otherName3,
			otherRelation3: loanObj.otherRelation3,
			otherUnit3: loanObj.otherUnit3,
			otherLocation3: loanObj.otherLocation3,
			otherPhone3: loanObj.otherPhone3,
			busiName: loanObj.busiName,
			busiProduct: loanObj.busiProduct,
			busiAddress: loanObj.busiAddress,
			busiTime: loanObj.busiTime,
			ownership: loanObj.ownership,
			workerNum: loanObj.workerNum,
			busiArea: loanObj.busiArea,
			mgtPerson: loanObj.mgtPerson,
			mgtContact: loanObj.mgtContact,
			investAmount: loanObj.investAmount,
			rate: loanObj.rate,
			saleScale: loanObj.saleScale,
			shangyou: loanObj.shangyou,
			shangyouPhone: loanObj.shangyouPhone,
			xiayou: loanObj.xiayou,
			xiayouPhone: loanObj.xiayouPhone,
			vocation: loanObj.vocation,
			bankLoan: loanObj.bankLoan,
			bankGuaran: loanObj.bankGuaran,
			xiaoeLoan: loanObj.xiaoeLoan,
			xiaoeGuaran: loanObj.xiaoeGuaran,
			assetSituation: loanObj.assetSituation,
			assetRatio: loanObj.assetRatio,
			creditRecord: loanObj.creditRecord,
			knowUsWays: loanObj.knowUsWays,
			lendingTime: loanObj.lendingTime,
			lendingQuota: loanObj.lendingQuota,
			lendingSide: loanObj.lendingSide,
			cusMger: loanObj.cusMger,
			comment: loanObj.comment,
			knowUsWaysOther: loanObj.knowUsWaysOther,
			vocationOther: loanObj.vocationOther,
			houseProperYue: loanObj.houseProperYue
		})

		_loan.save(function(err, loan) {
			if (err) {
				console.log(err)
			}
			res.redirect('/loan/' + loan._id)
		})
	}
})

//更新页
app.get('/update/:id', function(req, res) {
	var id = req.params.id
	if(id){
		Loan.findById(id, function(err, loan) {
			res.render('loanIn', {
				title: '××××××××××××',
				loan: loan
			})
		})
	}
})

//删除记录
app.delete('/', function(req, res){
	var id = req.query.id

	if(id){
		Loan.remove({_id: id}, function(err, loan) {
			if(err){
				console.log(err)
			}
			else {
				res.json({success: 1})
			}
		})
	}
})

//点击搜索操作
app.post('/', function(req, res) {
	var recordCount;
    if(req.body.loanName) {
    	var loanName = new RegExp(req.body.loanName)
    	Loan.searchName(loanName, function(err, loans) {
			if(err) {
				console.log(err)
			}
			recordCount = loans.length

			Loan.fenzu(loanName, 1, function(err, loans) {
				if(err) {
					console.log(err)
				}
				res.render('index', {
					title: '××××××××××××',
					loans: loans,
					recordCount: recordCount,
					searchCondition: req.body.loanName,
					currentPage: 1
				})
			})
		})
    }
    else{
    	Loan.fetch(function(err, loans) {
			if(err) {
				console.log(err)
			}
			recordCount = loans.length;

			Loan.fenzu(null, 1, function(err, loans) {
				if(err) {
					console.log(err)
				}
				res.render('index', {
					title: '××××××××××××',
					loans: loans,
					recordCount: recordCount,
					searchCondition: '',
					currentPage: 1
				})
			})
		})
    }
})


