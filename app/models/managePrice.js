var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var ManagePriceSchema = new Schema({
     referral_ammount :{
        type: Number,
        default: 50
     },
     earning_ammount :{     // 10 % amount of mining_ammount
        type: Number,
        default: 1
     },
     mining_rate:{           // earning amount devide by 24 hour 
        type: Number,
        default: ""
     },
     mining_ammount :{
        type: Number,
        default: 10
     },
     number_reward :{
        type: Number,
        default:10
     },
     reddit_reward :{
        type: Number,
        default: 10
     },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String ,
        default: 'active'
    },
   

}, { versionKey: false, timestamps:true });

ManagePriceSchema.plugin(mongoosePaginate);
let ManagePriceModel = mongoose.model('manageprice', ManagePriceSchema);
module.exports = ManagePriceModel;

(function init() {
    var obj = {
        mining_rate: 0.0416,
        created_by: '607e5136b24182674c4a8ed6'    // admin Id
    }
    mongoose.model('manageprice', ManagePriceSchema).findOne({ created_by: '607e5136b24182674c4a8ed6'  }, (err, result) => {
        if (err) {
            console.log("Error ", err);
        }
        else if (!result) {
            mongoose.model('manageprice', ManagePriceSchema).create(obj, (err, success) => {
                if (err) console.log("error ", err);
                else
                    console.log("Created ", success);
            })
        } else {
            console.log("already created");
        }

    })
})();