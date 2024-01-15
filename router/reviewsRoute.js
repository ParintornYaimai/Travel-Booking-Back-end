const express =  require('express')
const router = express.Router()
const {createReview} = require('../controller/reviewController')
const {verifyUser} = require('../util/verifyToken')

router.post('/:tourId',verifyUser,createReview)




module.exports = router