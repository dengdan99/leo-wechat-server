const mongoose = require('mongoose')
const User = mongoose.model('User')

exports.findOneByNickname = async (nickname) => {
  let user = await User.findOne({nickname})
  return user
}

exports.findContactsByNickname = async (nickname) => {
  let user = await User.findOne({nickname}, ['friends']).populate('friends', ['created', 'nickname', 'lastLogin'])
  return user.friends || []
}

exports.updateSocketByNickname = async (nickname, socketId) => {
  let user = await User.findOne({nickname})
  if (!user) {
    throw new Error('用户不存在')
    return
  }
  user.socketId = socketId
  user.save()
}

exports.addContacts = async (nickname, to_nickname) => {
  let [user, frined] = await Promise.all([User.findOne({nickname}), User.findOne({nickname: to_nickname})])
  if (!user || !frined) {
    throw new Error('用户不存在')
    return
  }
  if (user.friends.indexOf(frined._id) >= 0) {
    throw new Error('该用户已经是好友了')
    return
  }
  user.friends.push(frined._id)
  user.save()
}

exports.removeContacts = async (nickname, to_nickname) => {
  let [user, frined] = await Promise.all([User.findOne({nickname}), User.findOne({nickname: to_nickname})])
  if (!user || !frined) {
    throw new Error('用户不存在')
    return
  }
  const index = user.friends.indexOf(frined._id)
  if (index >=0) {
    user.friends.splice(index, 1)
    user.save()
  }
  return user
}

exports.findByNickname = async (nickname) => {
  var query= new RegExp(nickname, 'i')
  let users = await User.find({nickname: query})
  return users
}

exports.login = async (nickname, password) => {
  let user = await User.findOne({nickname})
  if (user) {
    if (user.password === password) {
      user.lastLogin = Date.now()
      user.save()
      delete user.password
      return user
    }
    throw new Error('密码错误')
    return
  }
  throw new Error('用户不存在')
  return
}

exports.register = async (nickname, password) => {
  let user = await User.findOne({nickname})
  if (user) {
    throw new Error('该用户已经存在')
    return
  }
  user = new User({
    password,
    nickname,
    lastLogin: Date.now()
  })
  try {
    user = await user.save()
  } catch (err) {
    throw err
  }
  delete user.password
  return user
}
