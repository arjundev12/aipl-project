var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var chapterSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        default: "",
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'delete'],
        default: "active"
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
}, { versionKey: false, timestamps: true });

chapterSchema.plugin(mongoosePaginate);
let ChapterModel = mongoose.model('chapters', chapterSchema);
module.exports = ChapterModel;