const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const faqSchema = Schema({
    type: {
        type: String,
    },
    question: {
        type: String,
        default: ""
    },
    answer: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['open', 'pending', 'done'],
        default :'open'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
},{timestamps: true, versionKey: false, });
faqSchema.plugin(mongoosePaginate);
const FaqModel = mongoose.model('faq', faqSchema);
module.exports = FaqModel;