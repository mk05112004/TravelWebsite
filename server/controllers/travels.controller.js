const { StatusCodes } = require('http-status-codes');
const Travel = require('../models/Travel');

const createTravel = (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      currency,
      image,
      duration,
      durationUnit,
      country,
      city,
      startDate,
      transportation,
    } = req.body;
    const newTravel = new Travel();

    const travel = newTravel.save();

    res
      .status(StatusCodes.CREATED)
      .json({
        success: true,
        data: travel,
        message: 'travel created successfully',
      });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
