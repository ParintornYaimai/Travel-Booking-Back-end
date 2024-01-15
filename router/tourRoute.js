const express = require("express");
const router = express.Router();
const {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  searchTour,
  getFeaturedTour,
  getTourCounts
} = require("../controller/tourController");
const {verifyAdmin} = require('../util/verifyToken')

//create tour
router.post("/",verifyAdmin, createTour);
//update tour
router.put("/:id",verifyAdmin, updateTour);
//delete tour
router.delete("/:id",verifyAdmin, deleteTour);
//getSingle tour
router.get("/:id", getSingleTour);
//getAll tour
router.get("/", getAllTour);
//search tour
router.get("/search/getTourBySearch", searchTour);
router.get("/search/getFeaturedTour", getFeaturedTour);
router.get("/search/getTourCount", getTourCounts);
module.exports = router;
