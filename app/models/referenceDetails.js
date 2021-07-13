var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var RefSchema = new Schema({
  user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
  },
  Referral_id: {
    type: String,
    trim: true,
  },
  reftoUsers: {
    type: { any: [Schema.Types.Mixed] }
  },
 
}, { timestamps: true });
RefSchema.plugin(mongoosePaginate);
let UsersModel = mongoose.model('referenceDetails', RefSchema);
module.exports = UsersModel;