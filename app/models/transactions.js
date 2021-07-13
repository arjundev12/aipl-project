var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var transactionSchema = new Schema({
    transaction_type: {
        type: String,
        enum: ['mining', 'referral','earning'],
    },
    amount: {
        type: Number,
        default: 0,
        trim: true
    },
    type: {
        type: String,
       enum: ['send', 'recieve']
    },
    from_id :{
        type: String,
        trim: true
    },
    to_id :{
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'complete', 'cancel'],
        default: 'complete'
    },
    reason :{
        type: String,
        trim: true
    }

}, { versionKey: false, timestamps: true });

transactionSchema.plugin(mongoosePaginate);
let transactionModel = mongoose.model('transaction', transactionSchema);
module.exports = transactionModel;

