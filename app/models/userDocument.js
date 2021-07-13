var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var documentSchema = new Schema({
      document: {
        type: { any: [Schema.Types.Mixed] },
      },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
}, { versionKey: false, timestamps: true });

documentSchema.plugin(mongoosePaginate);
let DocumentsModel = mongoose.model('userdocuments', documentSchema);
module.exports = DocumentsModel;

