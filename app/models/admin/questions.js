var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var questionSchema = new Schema({
    quesno: {
      type: Number,
      require: true
    },
    question: {
      type: String,
      require: true,
      trim: true
    },
    info: {
      type: { any: [Schema.Types.Mixed] },
    },
    pin: {
      type: { any: [Schema.Types.Mixed] },
    },
    flag: {
      type: { any: [Schema.Types.Mixed] },
    },
    options: { // its must be array of objects
        type: { any: [Schema.Types.Mixed] }
    },
    image : {
      type: String,
      default: "",
      trim: true
    },
    correct_index: {
        type: Number,
        require: true 
    },
    difficulty_level: {
      type: String,
      default: "",
      trim: true
  },
    status: {
      type: String,
      enum : ['active', 'inactive', 'delete'],
      default :"active"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
  },
  subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subcategories",
      require: true
  },
  category_meta: {
      type: { any: [Schema.Types.Mixed] }
  },
  subcategory_meta: {
      type: { any: [Schema.Types.Mixed] }
  },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chapters",
        require: true
    },
    chapter_meta: {
        type: { any: [Schema.Types.Mixed] }
    },
   }, { versionKey: false, timestamps:true });

questionSchema.plugin(mongoosePaginate);
let QuestionModel = mongoose.model('questions', questionSchema);
module.exports = QuestionModel;