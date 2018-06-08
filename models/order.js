const mongoose = require('mongoose')
const Schema = mongoose.Schema

let OrderSchema = new Schema({
  userId: { type: Number, require: true },
  created: { type: Date, default: Date.now() },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true }
})

module.exports = mongoose.model('Order', OrderSchema)