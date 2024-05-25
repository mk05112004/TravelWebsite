const User = require('../models/User');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, password, level } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: true, message: 'email is required' });
    }

    if (!phone) {
      return res
        .status(400)
        .json({ success: true, message: 'phone number is required' });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: true, message: 'password is required' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
      level,
    });

    const user = await newUser.save();

    // remove password
    const { password: pass, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      success: true,
      data: { user: userWithoutPassword },
      message: 'successfully registered',
    });
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, phone, password } = req.body;

    if (!email && !password) {
      return res
        .status(400)
        .json({ success: true, message: 'email is required' });
    }

    if (!password) {
      return res
        .status(400)
        .json({ success: true, message: 'password is required' });
    }

    // find where email or password is equal
    const user = await User.findOne({ $or: [{ email }, { phone }] });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, message: 'invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        phone: user.phone,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    // remove password
    const { password: pass, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      success: true,
      data: { user: userWithoutPassword, token },
      message: 'successfully logged in',
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  register,
  login,
};
