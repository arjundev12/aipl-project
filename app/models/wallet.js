var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var walletSchema = new Schema({
    wallet: {
        type: String
    },
    total_amount: {
        type: Number,
        default: 0,
    },
    Currency_type: {
        type: String,
        default: "rs",
        trim: true
    },
    coin_type: {
        type: String,
        default: "PC",
        trim: true
    },
    referral_ammount: {
        type: Number,
        default: 0,
    },
    earning_ammount: {
        type: Number,
        default: 0,
    },
    mining_ammount: {
        type: Number,
        default: 0,
    },
    wallet_type: {
        type: String,
        enum: ['user', 'admin'],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String 
    }

}, { versionKey: false, timestamps:true });

walletSchema.plugin(mongoosePaginate);
let Walletmodel = mongoose.model('wallet', walletSchema);
module.exports = Walletmodel;