var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
var UsersSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  user_id:{
    type: String,
    trim: true
  },
  profile_pic: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    default: ""
    // require: true
  },
  password: {
    type: String,
    trim: true,
  },
  contact_number: {
    type: String,
    trim: true,
    default:""
  },
  gender: {
    type: String,
    trim: true,
    default:""
  },
  address: {
    type: String,
    trim: true,
    default:""
  },
  state: {
    type: String,
    trim: true,
    default:""
  },
  country: {
    type: String,
    trim: true,
    default:""
  },
  pin: {
    type: String,
    trim: true,
    default:""
  },
  country_code: {
    type: String,
    trim: true,
    default:""
  },
  DOB: {
    type: String,
    trim: true,
    default:""
  },
  social_id: {
    type: String,
    trim: true,
    default:""
  },
  social_type:  {
    type: String,
    enum: ['facebook', 'google', 'apple', 'manual']
  },
  block_user: {
    type: String,
    enum: ['1', '0'],
    default: '0'
  },
  device_type: {
    type: String,
    trim: true,
  },
  user_type: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  is_email_verify: {
    type: String,
    values: ['1', '0','2'],
    default: '0'
  },
  is_number_verify: {
    type: String,
    values: ['1', '0','2'],
    default: '0'
  },
  is_facebook: {
    type: String,
    values: ['1', '0','2'],
    default: '0'
  },
  is_apple: {
    type: String,
    values: ['1', '0','2'],
    default: '0'
  },
  is_super_admin: {
    type: String,
    values: ['0', '1'],
    default: '0'
  },
  forgot_otp: {
    type: String,
    trim: true,
  },
  forgot_otp_verify: {
    type: Boolean,
    default:false
  },
  profile_details: {
    type: { any: [Schema.Types.Mixed] }
  }
}, { timestamps: true });
UsersSchema.plugin(mongoosePaginate);
let UsersModel = mongoose.model('users', UsersSchema);
UsersModel.createIndexes();
module.exports = UsersModel;