const express = require('express');
const connectDB = require('./db/connect');
require('dotenv').config();

// routers
const authRouter = require('./routes/auth.router');

// constants
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGODB_URI;

// initialize new app
const app = express();

// middlewares
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);

app.listen(PORT, async () => {
  try {
    await connectDB(URI);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
