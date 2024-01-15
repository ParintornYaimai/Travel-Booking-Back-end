const express = require('express')
const router = express.Router()
const {verifyUser,verifyAdmin} = require('../util/verifyToken')
const {createBooking,getBooking,getAllBooking} = require('../controller/bookingController')



router.post('/createBooking',verifyUser,createBooking)
router.get('/getBooking/:id',verifyUser,getBooking)
router.get('/getAllBooking',verifyAdmin,getAllBooking)






module.exports = router