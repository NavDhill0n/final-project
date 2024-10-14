// student.js
const mongoose = require('mongoose');

const rolesEnum = ['student', 'classRep', 'prefect']; // Roles specific to students 

const studentSchema = new mongoose.Schema({
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
    default: 'student' // Default role is 'student'
  },
});

// Method to check specific role
studentSchema.methods.hasRole = function(role) {
  return this.role === role; // Compare single role instead of array
};

module.exports = mongoose.model('Student', studentSchema);
