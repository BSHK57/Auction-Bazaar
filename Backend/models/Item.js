/*const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  seller_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    index: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['electronics', 'fashion', 'home', 'books', 'others'], 
    default: 'others',
    index: true
  },
  starting_bid: { 
    type: Number, 
    required: true,
    min: [0, 'Starting bid must be a positive number']
  },
  auction_start: { 
    type: Date, 
    required: true,
    validate: {
      validator: function (value) {
        return value >= Date.now(); // Auction can't start in the past
      },
      message: 'Auction start date must not be in the past'
    }
  },
  auction_end: { 
    type: Date, 
    required: true,
    validate: {
      validator: function (value) {
        return value > this.auction_start; // Auction end must be after start
      },
      message: 'Auction end date must be after the start date'
    }
  },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active'
  },
  created_at: { 
    type: Date, 
    default: Date.now 
  },
  updated_at: { 
    type: Date, 
    default: Date.now 
  }
});

// Middleware to update `updated_at` and validate dates
productSchema.pre('save', function (next) {
  this.updated_at = Date.now();

  if (this.auction_end <= this.auction_start) {
    return next(new Error('Auction end date must be after the start date'));
  }

  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;*/

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  // status: { type: String, enum: ['For Sale', 'Sold', 'Unsold'], default: 'For Sale' },
  salePrice: { type: Number},
  category:{type:String,enum:['Electronics', 'Fashion', 'Laptops', 'Books', "TV's", "Antiques"],required:true},
  image: { type: String, required: true },
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bid' }]
});

module.exports = mongoose.model('Item', itemSchema);

