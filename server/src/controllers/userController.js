const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const { uploadFile } = require("../aws/awsUpload");

//=========================================== Create User ==============================================================================================

const createUser = async (req, res) => {
  try {
    let data = req.body;
    let files = req.files;

    //hashing the password with bcrypt
    data.password = await bcrypt.hash(data.password, 10);

    //checking if email already exist or not
    let checkEmail = await userModel.findOne({ email: data.email });
    if (checkEmail)
      return res
        .status(400)
        .send({ success: false, message: "Email already exist" });

    //getting the AWS-S3 link after uploading the user's profileImage
    if (files && files.length > 0) {
      let profileImgUrl = await uploadFile(files[0]);
      data.profileImage = profileImgUrl;
    }

    let getUserDoc = await userModel.create(data);
    res.status(200).send({
      success: true,
      message: "User created successfully",
      data: getUserDoc,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

//=========================================== Login User ===============================================================================================

const loginUser = async function (req, res) {
  try {
    let data = req.body;

    const { email, password } = data;
    
    // finding the user
    let user = await userModel.findOne({ email });
    console.log(email, data)
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User does not exist" });
    }

    // password checking
    let actualPassWord = await bcrypt.compare(password, user.password);

    if (!actualPassWord)
      return res
        .status(400)
        .send({ success: false, message: "Incorrect password" });

    // Token Generation
    let token = jwt.sign({ userId: user._id }, "Geekybytes", {
      expiresIn: "1d",
    });

    res.setHeader("authToken", token);
    res.status(200).send({
      success: true,
      message: "User login successfully",
      data: { userId: user._id, token: token },
    });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
};

//=========================================== Get User =================================================================================================

const getUser = async (req, res) => {
  try {
    let userName = req.params.userName;
    let userId;
    if(!userName) {
     userId = req.body.userId
    }

    let getUserDoc = await userModel.findOne({ $or: [{userName: userName}, {_id: userId}] });
    if (!getUserDoc)
      return res
        .status(404)
        .send({ success: false, message: "User does not exist" });

    res
      .status(200)
      .send({ success: true, message: "User profile", data: getUserDoc });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

//=========================================== Update User ==============================================================================================

const updateUser = async (req, res) => {
  try {
    let userName = req.params.userName;
    let data = req.body;
    let files = req.files;

    //getting the AWS-S3 link after uploading the user's profileImage
    if (files && files.length > 0) {
      let profileImgUrl = await uploadFile(files[0]);
      data.profileImage = profileImgUrl;
    }

    if (data?.password) {
      //hashing the password with bcrypt
      data.password = await bcrypt.hash(data.password, 10);
    }

    if (data?.email) {
      //checking if email already exist or not
      let checkEmail = await userModel.findOne({
        email: data.email,
        isDeleted: false,
      });
      if (checkEmail)
        return res
          .status(400)
          .send({ success: false, message: "Email already exist" });
    }

    let updateUser = await User.findOneAndUpdate({ userName: userName }, data, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "User profile updated",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

//=========================================== Delete User ==============================================================================================

const deleteUser = async (req, res) => {
  try {
    let userName = req.params.userName;

    await userModel.updateOne(
      { userName: userName },
      { isDeleted: true },
      { new: true }
    );
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

//======================================================================================================================================================

module.exports = {
  createUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
};
