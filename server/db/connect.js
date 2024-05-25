const mongoose = require('mongoose');

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error(`Error occurred when connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;