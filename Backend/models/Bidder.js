const mongoose = require('mongoose');

const bidderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalSpent: { type: Number, default: 0 },
  bidHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }]
});

module.exports = mongoose.model('Bidder', bidderSchema);
