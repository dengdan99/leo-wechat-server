// const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  nickname: { type: String, requier: true, unique: true },
  password: { type: String, require: true },
  created: { type: Date, default: Date.now() },
  lastLogin: { type: Date },
  lastLogout: { type: Date },
  socketId: { type: String },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

module.exports = mongoose.model('User', UserSchema)