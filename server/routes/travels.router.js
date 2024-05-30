const router = require('express').Router();
const {
  createTravel,
  getTravels,
  getTravel,
  updateTravel,
  deleteTravel,
} = require('../controllers/travels.controller');
const {
  createReservation,
  getReservations,
  getReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router
  .route('/')
  .post(authMiddleware, adminMiddleware, createTravel)
  .get(getTravels);
router
  .route('/:id')
  .get(getTravel)
  .put(authMiddleware, adminMiddleware, updateTravel)
  .delete(authMiddleware, adminMiddleware, deleteTravel);

router
  .route('/:travelId/reservations')
  .post(authMiddleware, createReservation)
  .get(getReservations);
router
  .route('/:travelId/reservations/:id')
  .get(authMiddleware, getReservation)
  .put(authMiddleware, adminMiddleware, updateReservation)
  .delete(authMiddleware, deleteReservation);

module.exports = router;
