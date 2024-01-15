const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password, photo } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const user = await User.create({ username, email, password:hashPassword, photo });
      if (user) {
        return res.status(200).json({
          success: true,
          message: "User created successfully",
          data: user,
        });
      }
    } else {
      res.status(400).json({
        message: "User already exists",
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (isMatch) {
        const token = await jwt.sign(
          { id: userExist.id },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        if (token) {
          const {password:hashPassword,...rest} = userExist._doc;
          const expiryDate = new Date(Date.now()+3600000)
          res.cookie("accessToken", token, {
            httpOnly: true,
            sameSite: "strict",
            expires: expiryDate,
          })
          .status(200).json({
            success: true,
            message: "User logged in successfully",
            data: rest,
          })
        } else {
          res.status(400).json({
            message: "Unable to complete the transaction. Please try again",
          });
        }
      } else {
        res.status(400).json({
          message: "Wrong username or password",
        });
      }
    } else {
      res.status(400).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

exports.logout=(req,res)=>{
  res.clearCookie('token').status(200).json('Logout Success')
}