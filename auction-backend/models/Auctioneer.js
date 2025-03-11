const mongoose = require('mongoose');

const auctioneerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalSales: { type: Number, default: 0 },
  totalProfit: { type: Number, default: 0 },
  activeAuctions: { type: Number, default: 0 }
});

module.exports = mongoose.model('Auctioneer', auctioneerSchema);
