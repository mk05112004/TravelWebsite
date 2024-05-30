
const adminMiddleware = (req, res, next) => {
  const { user } = req;
  console.log(user.role);
  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'unauthorized',
    });
  }
  next();
}

module.exports = adminMiddleware