const express = require("express");
const router = express.Router();
const tourController = require("../controllers/tour.controller");

router
  .route("/tours")
  .get(tourController.getTours)
  .post(tourController.createTour);
router.route("/tour/trending").get(tourController.getTrendingTours);

router.route("/tour/cheapest").get(tourController.getCheapestTours);

router
  .route("/tours/:id")
  .get(tourController.getSingleTour)
  .patch(tourController.updateTourById);
module.exports = router;
