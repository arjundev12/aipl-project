var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var categorySchema = new Schema({
    name: {
      type: String,
      require: true,
      trim: true
    },
    content: {
      type: String,
      trim: true
    },
    image : {
      type: String,
      default: "",
      trim: true
    },
    status: {
      type: String,
      enum : ['active', 'inactive', 'delete'],
      default :"active"
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
   }, { versionKey: false, timestamps:true });

categorySchema.plugin(mongoosePaginate);
let CategoryModel = mongoose.model('categories', categorySchema);
module.exports = CategoryModel;