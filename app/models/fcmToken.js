var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var fcmTokenSchema = new Schema({
     fcmToken :{
        type: { any: [Schema.Types.Mixed] }
     },
     device :{
        type: String,
        trim:true,
        default: 'android'
     },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    status: {
        type: String ,
        default: 'active'
    },
   

}, { versionKey: false, timestamps:true });

fcmTokenSchema.plugin(mongoosePaginate);
let Fcmtokenmodel = mongoose.model('fcmtoken', fcmTokenSchema);
module.exports = Fcmtokenmodel;