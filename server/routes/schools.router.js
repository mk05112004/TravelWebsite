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

router.route('/').post(createSchool).get(getSchools);
router.route('/:id').get(getSchool).put(updateSchool).delete(deleteSchool);

router.route('/:schoolId/users').post(createUser).get(getUsers);
router
  .route('/:schoolId/users/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;
