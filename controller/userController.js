const User = require("../models/User");

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
  try {
    const user = await User.findByIdAndDelete({id});
    if(user){
        res.status(200).json({
            message:'User deleted successfully'
        })
    }else{
        res.status(400).json({
            message:'User not found'
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:'Server error'
    })
  }
};

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const content = req.body;
  try {
    const  user = await User.findByIdAndUpdate(id,{$set:content},{new:true})
    if(user){
        res.status(200).json({
            message:'User updated successfully',
            data:user
        })
    }else{
        res.status(400).json({
            message:'User not found'
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:'Server error'
    })
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    if(user){
        res.status(200).json({
            message:'Single user',
            data:user
        })
    }else{
        res.status(400).json({
            message:'User not found'
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:'Server error'
    })
  }
};
exports.getallUsers = async (req, res) => {
  try {
    const users = await User.find()
    if(users){
        res.status(200).json({
            message:'All users',
            data:users
        })
    }else{
        res.status(400).json({
            message:'Users not found'
        })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:'Server error'
    })
  }
};
