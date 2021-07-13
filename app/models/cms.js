var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var cmsSchema = new Schema({
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    type: {
        type: String,
        default: ""
      },
    image : {
      type: String,
      default: ""
    },
    status: {
      type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
   }, { versionKey: false, timestamps:true });

cmsSchema.plugin(mongoosePaginate);
let CmsModel = mongoose.model('cms', cmsSchema);
module.exports = CmsModel;