const { parse } = require("dotenv");
const Tour = require("../models/Tour");

exports.createTour = async (req, res) => {
  const newTour = new Tour(req.body);
  try {
    const savedTour = await newTour.save();
    if (savedTour) {
      res.status(200).json({
        success: true,
        message: "Successfully created",
        data: savedTour,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create. Try again",
      data: error,
    });
  }
};

//update tour
exports.updateTour = async (req, res) => {
  const id = req.params.id;
  const content = req.body;
  try {
    const updateTour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (updateTour) {
      res.status(200).json({
        success: true,
        message: "Successfully updated",
        data: updateTour,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Unable to update",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update. Try again",
      data: error,
    });
  }
};

//delete tour
exports.deleteTour = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteTour = await Tour.findByIdAndDelete(id);
    if (deleteTour) {
      res.status(200).json({
        success: true,
        message: "Successfully deleted",
        data: deleteTour,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "can't be deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete. Try again",
      data: error,
    });
  }
};

//getSingle tour
exports.getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const singleTour = await Tour.findById(id)
    .populate('reviews')
    if (singleTour) {
      res.status(200).json({
        success: true,
        message: "Successfully get single tour",
        data: singleTour,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get single tour",
      data: error,
    });
  }
};

//getAll tour
exports.getAllTour = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const allTour = await Tour.find({})
      .populate('reviews')
      .skip(page * 8)
      .limit(8);
    if (allTour) {
      res.status(200).json({
        success: true,
        count: allTour.length,
        message: "Successfully get all tour",
        data: allTour,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get all tour", data: error });
  }
};

//get tour by search
exports.searchTour = async (req, res) => {
  const city = new RegExp(req.query.city, "i");
  const distance = parseInt(req.query.distance);
  const maxGroupSize = parseInt(req.query.maxGroupSize);

  try {
    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    })
    .populate('reviews')

    if (tours) {
      res.status(200).json({
        success: true,
        message: "Successfully search tour",
        data: tours,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search tour",
      data: error,
    });
  }
};

//get featured tour

exports.getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true })
    .populate('reviews')
    .limit(8)
    if (tours) {
      res.status(200).json({
        success: true,
        count: tours.length,
        message: "Successfully get featured tour",
        data: tours,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get featured tour",
      data: error,
    });
  }
};

//get tour counts

exports.getTourCounts = async (req, res) => {
  try {
    const tours = await Tour.estimatedDocumentCount();
    res.status(200).json({ success: true, count: tours });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get tour counts",
      data: error,
    });
  }
};
