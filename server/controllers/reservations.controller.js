const { StatusCodes } = require('http-status-codes');
const Reservation = require('../models/Reservation');

const createReservation = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { body } = req;
    const { travelId } = req.params;

    const newReservation = new Reservation({
      ...body,
      user: userId,
      travel: travelId,
    });

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
    const { status } = req.query;
    const reservations = await Reservation.find({ status })
      .populate('travel')
      .populate({
        path: 'user',
        select: ['firstName', 'lastName', 'email', 'phone'],
      });

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
