const orderServer = require('../service/order')
let max = 1000

exports.buy = async ctx => {
  let userId = ctx.request.query.userid
  if (!userId) {
    ctx.body = 'need userid'
    return
  }

  let count = await orderServer.countAll() 
  if (count > max) {
    ctx.body = 'sold out'
    return
  }
  let quantity = Math.ceil(Math.random() * 10 + 1)
  let total = quantity * 6.5
  let order = await orderServer.add({
    userId,
    quantity,
    total
  })
  order ? ctx.body = 'success' : ctx.body = 'fail'
}

exports.statistics = async (ctx) => {
  let res = await orderServer.statistics()
  ctx.body = res
}

exports.get = (ctx, id) => {
  ctx.body = id
}