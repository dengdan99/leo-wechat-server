const mongoose = require('mongoose')
const Order = mongoose.model('Order')

exports.countAll = async () => {
  let query = await Order.count()
  return query || 0
}

exports.add = async (order) => {
  let _order = new Order(order)
  console.log(_order)
  try {
    _order = await _order.save()
  } catch (err) {
    console.error(err.message)
    return false
  }
  return _order
}

exports.statistics = async () => {
  try {
    return Order.aggregate([
      { $match: { userId: 4 } },
      { $group:  {_id : '$userId', allTotal: { $sum: '$total' } } },
    ])
  } catch (err) {
    console.log(err.message)
    return false
  }
}