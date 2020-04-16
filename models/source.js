const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const SourceSchema = new Schema({
  index: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  unique_id: {
    type: String,
    required: true
  },
  
})

module.exports = Source = mongoose.model('Source', SourceSchema)