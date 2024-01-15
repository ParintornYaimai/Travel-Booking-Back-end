const Booking = require("../models/Booking");

//create new booking
exports.createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
  try {
    const saveBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      message: "Your tour is booked",
      data: saveBooking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "You can't book a tour",
      data: error,
    });
  }
};

//get single booking
exports.getBooking = async(req,res)=>{
    const id = req.params.id
    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success:true,
            message:'successful',
            data:book
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:'server error',
            data:error
        })
    }
}

//get all booking
exports.getAllBooking = async(req,res)=>{
    try {
        const book = await Booking.find()
        res.status(200).json({
            success:true,
            message:"successful",
            data:book
        })
    } catch (error) {
        res.status(500).json({
            success:true,
            message:"server error",
            data:error
        })
    }
}