var mongoose = require('mongoose')
var LoanSchema = new mongoose.Schema({
	loanName: String,
	loanID: String,
	busiProper: String,
	loanMoney: String,
	loanTime: String,
	loanProduct: String,
	loanUsing: String,
	birthDate: String,
	sex: String,
	huji: String,
	timeInQD: String,
	location: String,
	houseProper: String,
	maritalStatus: String,
	familyNum: String,
	mobilePhone: String,
	fixedPhone: String,
	otherContact: String,
	eduLevel: String,
	workUnit: String,
	workTime: String,
	workDuties: String,
	workPhone: String,
	spouseName: String,
	spouseID: String,
	spouseUnit: String,
	spouseDuties: String,
	spousePhone: String,
	otherName1: String,
	otherRelation1: String,
	otherUnit1: String,
	otherLocation1: String,
	otherPhone1: String,
	otherName2: String,
	otherRelation2: String,
	otherUnit2: String,
	otherLocation2: String,
	otherPhone2: String,
	otherName3: String,
	otherRelation3: String,
	otherUnit3: String,
	otherLocation3: String,
	otherPhone3: String,
	busiName: String,
	busiProduct: String,
	busiAddress: String,
	busiTime: String,
	ownership: String,
	workerNum: String,
	busiArea: String,
	mgtPerson: String,
	mgtContact: String,
	investAmount: String,
	rate: String,
	saleScale: String,
	shangyou: String,
	shangyouPhone: String,
	xiayou: String,
	xiayouPhone: String,
	vocation: String,
	bankLoan: String,
	bankGuaran: String,
	xiaoeLoan: String,
	xiaoeGuaran: String,
	assetSituation: String,
	assetRatio: String,
	creditRecord: String,
	knowUsWays: String,
	lendingTime: String,
	lendingQuota: String,
	lendingSide: String,
	cusMger: String,
	comment: String,
	knowUsWaysOther: String,
	vocationOther: String,
	houseProperYue: String,
	meta:{
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})

LoanSchema.pre('save', function(next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now()
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})

LoanSchema.statics = {
	fetch: function(cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	searchName: function(_loanName, cb) {
		return this
			.find({loanName: _loanName})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	},
	fenzu: function(_loanName, pageNum, cb) {
		if(pageNum == 1 && _loanName !='undefined' && _loanName != null && _loanName != ''){
			return this
			.find({loanName: _loanName})
			.sort('meta.updateAt')
			.limit(10)
			.exec(cb)
		}
		else if(pageNum > 1 && _loanName !='undefined' && _loanName != null && _loanName != ''){
			return this
			.find({loanName: _loanName})
			.sort('meta.updateAt')
			.skip((pageNum-1)*10)
			.limit(10)
			.exec(cb)
		}
		else if(pageNum == 1 && (_loanName =='undefined' || _loanName == null || _loanName == '')){
			return this
			.find({})
			.sort('meta.updateAt')
			.limit(10)
			.exec(cb)
		}
		else if(pageNum > 1 && (_loanName =='undefined' || _loanName == null || _loanName == '')){
			return this
			.find({})
			.sort('meta.updateAt')
			.skip((pageNum-1)*10)
			.limit(10)
			.exec(cb)
		}
	}
}

module.exports = LoanSchema