const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bidder', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  bidAmount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bid', bidSchema);
