const { StatusCodes } = require('http-status-codes');
const User = require('../models/User');

const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { schoolId } = req.params;

    const newUser = new User({ ...body, school: schoolId });

    const user = await newUser.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      data: user,
      message: 'user created successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const { schoolId } = req.params;
    const { level } = req.query;
    const users = await User.find({ level, school: schoolId });

    res.status(StatusCodes.OK).json({
      success: true,
      data: users,
      message: 'users fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'user not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
      message: 'user fetched successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const userDocument = await User.findById(id);

    const password = userDocument.password;

    console.log('------------------');
    console.log(password);
    console.log('------------------');

    const user = await User.findByIdAndUpdate(
      id,
      { ...body, password },
      { new: true }
    );

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'user not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
      message: 'user updated successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'user not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: user,
      message: 'user deleted successfully',
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
