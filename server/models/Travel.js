const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    startDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    durationUnit: {
      type: Enumerator,
      enum: ['days', 'weeks', 'months', 'years'],
      required: true,
    },
    transportation: {
      type: Enumerator,
      enum: ['plane', 'train', 'bus', 'car', 'boat'],
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
      trim: true,
    },
    registrations: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    // owner: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Travel', travelSchema);
