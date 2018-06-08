const userServer = require('../service/user')

exports.updateSocketId = async data => {
  const {nickname, socketId} = data
  if (nickname && socketId) {
    try {
      let user = await userServer.updateSocketByNickname(nickname, socketId)
      return {
        code: 0,
        data: user
      }
    } catch (err) {
      return {
        code: 1,
        msg: err.message
      }
    }
  }
  return {
    code: 1,
    msg: '参数错误'
  }
}

exports.login = async (data) => {
  const {nickname, password} = data
  if (nickname && password) {
    try {
      let user = await userServer.login(nickname, password)
      return {
        code: 0,
        data: user
      }
    } catch (err) {
      return {
        code: 1,
        msg: err.message
      }
    }
  }
  return {
    code: 1,
    msg: '请完善表单'
  }
}

exports.getContacts = async (data) => {
  const {nickname} = data
  if (nickname) {
    try {
      let users = await userServer.findContactsByNickname(nickname)
      return {
        code: 0,
        data: users
      }
    } catch (err) {
      return {
        code: 1,
        msg: err.message
      }
    }
  }
  return {
    code: 1,
    msg: '参数错误'
  }
}

exports.searchUsers = async (data) => {
  const {nickname} = data
  if (nickname) {
    try {
      let users = await userServer.findByNickname(nickname)
      return {
        code: 0,
        data: users
      }
    } catch (err) {
      return {
        code: 1,
        msg: err.message
      }
    }
  }
  return {
    code: 1,
    msg: '参数错误'
  }
}

exports.removeFriend = async (data) => {
  const {nickname, to_nickname} = data
  if (nickname && to_nickname) {
    try {
      let users = await userServer.removeContacts(nickname, to_nickname)
      return {
        code: 0,
        data: users
      }
    } catch (err) {
      return {
        code: 1,
        msg: err.message
      }
    }
  }
  return {
    code: 1,
    msg: '参数错误'
  }
}

exports.addFriend = async (data) => {
  const {nickname, to_nickname} = data
  if (nickname && to_nickname) {
    try {
      let users = await userServer.addContacts(nickname, to_nickname)
      return {
        code: 0,
        data: users
      }
    } catch (err) {
      return {
        code: 1,
        msg: err.message
      }
    }
  }
  return {
    code: 1,
    msg: '参数错误'
  }
}

