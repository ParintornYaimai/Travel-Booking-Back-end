const express = require("express");
const router = express.Router();
const {
  deleteUser,
  updateUser,
  getSingleUser,
  getallUsers,
} = require("../controller/userController");
const {verifyUser,verifyAdmin} = require('../util/verifyToken')


router.delete("/delete/:id",verifyUser,deleteUser);
router.put("/update/:id",verifyUser,updateUser);
router.get("/getSingleUser/:id",verifyUser,getSingleUser);
router.get("/getallUsers",verifyAdmin,getallUsers);

module.exports = router;
