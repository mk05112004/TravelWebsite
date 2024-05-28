const mongoose = require('mongoose');

const SchoolSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
    minlength: 3,
  },
  students: {
    type: Number,
    default: 0,
  },
  teachers: {
    type: Number,
  },
  classrooms: {
    type: Number,
  },
  founded: {
    type: Date,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model('School', SchoolSchema);
