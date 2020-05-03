const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CounterSchema = new Schema({
  currCount: {
    type: Number,
    required: true
  }
})

module.exports = Counter = mongoose.model('Counter', CounterSchema)