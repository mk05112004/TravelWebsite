const router = require('express').Router();
const {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations.controller');

router.route('/').post(createReservation).get(getReservations);
router
  .route('/:id')
  .get(getReservation)
  .put(updateReservation)
  .delete(deleteReservation);

module.exports = router;
