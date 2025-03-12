/*const mongoose = require('mongoose');
const argon2 = require('argon2'); // For password hashing
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true }, // Added name field
  username: { type: String, required: true, unique: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['bidder', 'auctioneer', 'admin'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Password Hashing Middleware
userSchema.pre('save', async function (next) {
  this.updated_at = Date.now();
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password); // Hashing the password
  }
  next();
});

// Method to validate password
userSchema.methods.isValidPassword = async function (password) {
  return await argon2.verify(this.password, password); // Verifying password
};

const User = mongoose.model('User', userSchema);
module.exports = User;
*/

const mongoose = require('mongoose');
const argon2 = require('argon2');
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String },
  phone: { type: String },
  status:{type:String,enum: ['Active', 'Inactive'], required: true,default:'Active'},
  bidder: { type: mongoose.Schema.Types.ObjectId, ref: 'Bidder', default: null },
  auctioneer: { type: mongoose.Schema.Types.ObjectId, ref: 'Auctioneer', default: null }, 
  updated_at: { type: Date, default: Date.now }
});

// Password Hashing Middleware (bcrypt)
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password, 10);
  }
  this.updated_at = Date.now();
  next();
});

// Method to compare passwords
userSchema.methods.isValidPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

module.exports = mongoose.model('User', userSchema);
