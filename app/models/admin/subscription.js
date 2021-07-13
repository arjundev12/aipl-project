const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const subscriptionSchema = Schema({
    type: {
        type: String,
    },
    title: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        default: 0
    },
    days: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'delete'],
        default :'active'
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
},{timestamps: true, versionKey: false, });
subscriptionSchema.plugin(mongoosePaginate);
const SubscriptionModel = mongoose.model('subscription', subscriptionSchema);
module.exports = SubscriptionModel;