var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const moment = require("moment");
const Schema = mongoose.Schema;
var notificationSchema = new Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    type: {
        type: String
    },
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    fromId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    viewer_id: {
        type: { any: [Schema.Types.Mixed] }
    },
    view_status: {
        type: Boolean,
        default : false
    },
    time: {
        type: String,
    }

}, { versionKey: false,timestamps: true });

notificationSchema.plugin(mongoosePaginate);
let NotificationModel = mongoose.model('notification', notificationSchema);
module.exports = NotificationModel;