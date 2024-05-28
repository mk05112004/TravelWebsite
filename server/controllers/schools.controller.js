const { StatusCodes } = require('http-status-codes');
const School = require('../models/School');

const createSchool = async (req, res, next) => {
  try {
    const { body } = req;

    const newSchool = new School({ ...body });

    const school = await newSchool.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: school,
      message: 'school created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getSchools = async (req, res, next) => {
  try {
    const schools = await School.find();

    res.status(StatusCodes.OK).json({
      success: true,
      data: schools,
      message: 'schools fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getSchool = async (req, res, next) => {
  try {
    const { id } = req.params;
    const school = await School.findById(id);

    if (!school) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'school not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: school,
      message: 'school fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateSchool = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const school = await School.findByIdAndUpdate(
      id,
      { ...body },
      { new: true, runValidators: true }
    );

    if (!school) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'school not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: school,
      message: 'school updated successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteSchool = async (req, res, next) => {
  try {
    const { id } = req.params;
    const school = await School.findByIdAndDelete(id);

    if (!school) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'school not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: school,
      message: 'school deleted successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
};
