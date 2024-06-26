const express = require('express');
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();

// routers
const authRouter = require('./routes/auth.router');
const schoolsRouter = require('./routes/schools.router');
const travelsRouter = require('./routes/travels.router');
const reservationsRouter = require('./routes/reservations.router');
const authMiddleware = require('./middlewares/auth.middleware');
const errorHandler = require('./middlewares/error.middleware');

// constants
const PORT = process.env.PORT || 8080;
const URI = process.env.MONGODB_URI;

// initialize new app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/schools', schoolsRouter);
app.use('/api/v1/travels', travelsRouter);
app.use('/api/v1/reservations', authMiddleware, reservationsRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  try {
    await connectDB(URI);
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
