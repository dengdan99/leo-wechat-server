const userServer = require('../service/user')

exports.login = async ctx => {
  const {nickname, password} = ctx.request.body
  if (nickname && password) {
    try {
      let user = await userServer.login(nickname, password)
      ctx.body = {
        code: 0,
        data: user
      }
    } catch (err) {
      ctx.body = {
        code: 1,
        msg: err.message
      }
    }
    return 
  }
  return ctx.body = {
    code: 1,
    msg: '请完善表单'
  }
}

exports.register = async ctx => {
  const {nickname, password} = ctx.request.body
  if (nickname && password) {
    try {
      let user = await userServer.register(nickname, password)
      ctx.body = {
        code: 0,
        data: user
      }
    } catch (err) {
      ctx.body = {
        code: 1,
        msg: err.message
      }
    }
    return 
  }
  return ctx.body = {
    code: 1,
    msg: '请完善表单'
  }
}

exports.contacts = async ctx => {
  const {nickname} = ctx.request.query
  if (!nickname) {
    return ctx.body = {
      code: 1,
      msg: '缺少参数： nickname'
    }
  }

  try {
    let contacts = await userServer.findContactsByNickname(nickname)
    ctx.body = {
      code: 0,
      data: contacts
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      msg: err.message
    }
  }
}

exports.addContacts = async ctx => {
  const {nickname, to_nickname} = ctx.request.body
  if (!nickname || !to_nickname) {
    return ctx.body = {
      code: 1,
      msg: '缺少参数'
    }
  }

  try {
    let contacts = await userServer.addContacts(nickname, to_nickname)
    ctx.body = {
      code: 0,
      data: null
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      msg: err.message
    }
  }
}

exports.removeContacts = async ctx => {
  const {nickname, to_nickname} = ctx.request.body
  if (!nickname || !to_nickname) {
    return ctx.body = {
      code: 1,
      msg: '缺少参数'
    }
  }

  try {
    let contacts = await userServer.removeContacts(nickname, to_nickname)
    ctx.body = {
      code: 0,
      data: null
    }
  } catch (err) {
    ctx.body = {
      code: 1,
      msg: err.message
    }
  }
}

exports.users = async ctx => {
  const {nickname} = ctx.request.query
  if (nickname) {
    try {
      let users = await userServer.findByNickname(nickname)
      ctx.body = {
        code: 0,
        data: users
      }
    } catch (err) {
      ctx.body = {
        code: 1,
        msg: err.message
      }
    }
    return
  }
  ctx.body = {
    code: 1,
    msg: '参数异常'
  }
}