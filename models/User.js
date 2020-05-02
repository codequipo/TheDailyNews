const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required:true
  },
  last_name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  suscribed:[{
      type:String,
  }],
  bookmarked:[{
      type:mongoose.SchemaTypes.ObjectId,
      ref:"Article"
  }],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('Users', UserSchema)