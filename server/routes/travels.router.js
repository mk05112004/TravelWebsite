const router = require('express').Router();
const {
  createTravel,
  getTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} = require('../controllers/travels.controller');

router.route('/').post(createTravel).get(getTravels);
router.route('/:id').get(getTravel).put(updateTravel).delete(deleteTravel);

module.exports = router;
