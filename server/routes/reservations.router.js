const router = require('express').Router();
const {
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations.controller');

router.route('/').get(getReservations);
router
  .route('/:id')
  .get(getReservation)
  .put(updateReservation)
  .delete(deleteReservation);

module.exports = router;
