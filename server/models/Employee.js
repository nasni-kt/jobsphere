// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  phone: { type: String },  // Add phone field
  location: { type: String }, // Add location field
  profilePicture: { type: String }, // If you have a profile picture
});

module.exports = mongoose.model('Employee', EmployeeSchema);
