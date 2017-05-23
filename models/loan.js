var mongoose = require('mongoose')
var LoanSchema = require('../schemas/loan')
var Loan = mongoose.model('Loan', LoanSchema)

module.exports = Loan