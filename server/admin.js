// admin.js
const mongoose = require('mongoose');

const rolesEnum = ['admin', 'superadmin', 'systemAdmin']; // Roles specific to admins

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: { // Change from 'roles' to 'role' and make it a single string
    type: String,
    enum: rolesEnum,
    default: 'admin' // Default role is 'admin'
  },
});

// Method to check specific role
adminSchema.methods.hasRole = function(role) {
  return this.role === role; // Compare single role instead of array
};

module.exports = mongoose.model('Admin', adminSchema);
