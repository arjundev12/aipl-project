var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var subcategorySchema = new Schema({
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
        require: true
    },
    category_meta: {
        type: { any: [Schema.Types.Mixed] }
    },
}, { versionKey: false, timestamps: true });

subcategorySchema.plugin(mongoosePaginate);
let SubCategoryModel = mongoose.model('subcategories', subcategorySchema);
module.exports = SubCategoryModel;