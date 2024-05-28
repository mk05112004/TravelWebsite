const { StatusCodes } = require('http-status-codes');
const Travel = require('../models/Travel');

const createTravel = async (req, res, next) => {
  try {
    const { body } = req;

    const newTravel = new Travel({ ...body });

    const travel = await newTravel.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: travel,
      message: 'travel created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTravels = async (req, res, next) => {
  try {
    const travels = await Travel.find();

    res.status(StatusCodes.OK).json({
      success: true,
      data: travels,
      message: 'travels fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTravel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const travel = await Travel.findById(id);

    if (!travel) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'travel not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: travel,
      message: 'travel fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateTravel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const travel = await Travel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!travel) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'travel not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: travel,
      message: 'travel updated successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteTravel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const travel = await Travel.findByIdAndDelete(id);

    if (!travel) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'travel not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: travel,
      message: 'travel deleted successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createTravel,
  getTravels,
  getTravel,
  updateTravel,
  deleteTravel,
};
