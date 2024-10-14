// teacher.js
const mongoose = require('mongoose');

const rolesEnum = ['teacher', 'headTeacher', 'dean']; // Roles specific to teachers

const teacherSchema = new mongoose.Schema({
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
    default: 'teacher' // Default role is 'teacher'
  },
});

// Method to check specific role
teacherSchema.methods.hasRole = function(role) {
  return this.role === role; // Compare single role instead of array
};

module.exports = mongoose.model('Teacher', teacherSchema);
