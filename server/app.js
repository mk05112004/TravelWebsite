const express = require('express');
const connectDB = require('./db/connect');

// constants
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGODB_URI;

// initialize new app
const app = express();

app.listen(PORT, async () => {
  try {
    await connectDB(URI);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
