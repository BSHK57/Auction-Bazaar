const mongoose = require('mongoose');
const argon2 = require('argon2');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true }, 
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String ,default:"picture"},
  phone: { type: String },
  permissions: [{
    type: String,
    enum: ['Manage Auctions', 'View Users', 'Manage Users', 'View Reports', 'Delete Auctions', 'Edit Auctions'],
    default: ['Manage Auctions', 'View Users', 'Manage Users', 'View Reports', 'Delete Auctions', 'Edit Auctions']
  }]
});

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon2.hash(this.password, 10);
  }
  next();
});

adminSchema.methods.isValidPassword = async function (password) {
  return await argon2.verify(this.password, password);
};

module.exports = mongoose.model('Admin', adminSchema);
