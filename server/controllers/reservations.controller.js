const { StatusCodes } = require('http-status-codes');
const Reservation = require('../models/Reservation');

const createReservation = async (req, res, next) => {
  try {
    const { body } = req;

    const newReservation = new Reservation({ ...body });

    const reservation = await newReservation.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: reservation,
      message: 'reservation created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();

    res.status(StatusCodes.OK).json({
      success: true,
      data: reservations,
      message: 'reservations fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'reservation not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: reservation,
      message: 'reservation fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!reservation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'reservation not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: reservation,
      message: 'reservation updated successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'reservation not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: reservation,
      message: 'reservation deleted successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
};
