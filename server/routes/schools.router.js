const router = require('express').Router();
const {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
} = require('../controllers/schools.controller');

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
const adminMiddleware = require('../middlewares/admin.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

router
  .route('/')
  .post(authMiddleware, adminMiddleware, createSchool)
  .get(getSchools);
router
  .route('/:id')
  .get(getSchool)
  .put(authMiddleware, adminMiddleware, updateSchool)
  .delete(authMiddleware, adminMiddleware, deleteSchool);

router
  .route('/:schoolId/users')
  .post(authMiddleware, adminMiddleware, createUser)
  .get(getUsers);
router
  .route('/:schoolId/users/:id')
  .get(getUser)
  .put(authMiddleware, adminMiddleware, updateUser)
  .delete(authMiddleware, adminMiddleware, deleteUser);

module.exports = router;
