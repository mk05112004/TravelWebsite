
const adminMiddleware = (req, res, next) => {
  const { user } = req;
  if (user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'unauthorized',
    });
  }
  next();
}