const mongoose = require('mongoose');
const CartItem = require('./CartItem');
const Order = require('./Order');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
});
userSchema.pre('remove', async function (next) {
  try {
    // Remove all cart items associated with this user
    await CartItem.deleteMany({ user: this._id });

    // Remove all orders associated with this user
    await Order.deleteMany({ user: this._id });

    next();
  } catch (error) {
    next(error);
  }
});
const User = mongoose.model('User', userSchema);

module.exports = User;
