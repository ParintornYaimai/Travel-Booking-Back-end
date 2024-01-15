const Tour = require("../models/Tour");
const Review = require("../models/Review");

exports.createReview = async (req, res) => {
  const tourId = req.params.tourId;
  const newReview = new Review({ ...req.body });
  console.log(newReview);

  try {
    const saveReview = await newReview.save();
    const addreview = await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: saveReview.id },
    });
    if (addreview) {
      res
        .status(200)
        .json({ success: true, message: "Review submitted", data: saveReview });
    } else {
      res
        .status(400)
        .json({ success: true, message: "Unable to add a review" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      data: error,
    });
  }
};
