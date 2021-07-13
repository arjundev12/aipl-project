var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var blogsSchema = new Schema({
    title: {
      type: String,
      default: ""
    },
    content: {
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

blogsSchema.plugin(mongoosePaginate);
let Blogsmodel = mongoose.model('blogs', blogsSchema);
module.exports = Blogsmodel;