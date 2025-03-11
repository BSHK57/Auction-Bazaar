const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
  auctioneerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auctioneer', required: true },
  // description: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  completedTime: { type: Date},
  status: { type: String, enum: ['Active', 'Ended', 'Cancelled','Not Started','Pending','Rejected'], required: true },
  startingPrice: { type: Number, required: true },
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' }
});

module.exports = mongoose.model('Auction', auctionSchema);
