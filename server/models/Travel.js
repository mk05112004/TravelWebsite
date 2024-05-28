const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema(
  {
    // number: {
    //   type: Number,
    //   required: true,
    //   unique: true,
    // },
    name: {
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
    image: {
      type: String,
      required: true,
      trim: true,
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
      type: String,
      enum: ['days', 'weeks', 'months', 'years'],
      required: true,
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
    transportation: {
      type: String,
      enum: ['plane', 'train', 'bus', 'car', 'boat'],
      required: true,
    },
    price: {
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
      default: 0,
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
