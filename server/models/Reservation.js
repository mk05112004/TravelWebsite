const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    travel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Travel',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      required: true,
    },
    rate: {
      type: Number,
      default: null,
    },
    comment: {
      type: String,
      trim: true,
      minlength: 3,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Reservation', reservationSchema);
