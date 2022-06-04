const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { uploadFile } = require('../aws/awsUpload');

const createUser = async (req, res) => {
  try {
    let data = req.body;
    let files = req.files

    //hashing the password with bcrypt
    data.password = await bcrypt.hash(data.password, 10);
  
    //checking if email already exist or not
    let checkEmail = await userModel.findOne({ email: data.email });
    if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist" });

    //getting the AWS-S3 link after uploading the user's profileImage
    if(files && files.length>0){
      let profileImgUrl = await uploadFile(files[0]);
      data.profileImage = profileImgUrl;
    }

    let getUserDoc = await userModel.create(data);
    res.status(200).send({ status: true, message: "User created successfully", data: getUserDoc })
  } catch (err) {
    res.status(500).send({ status: false, message: "Internal server error", error: err.message })
  }
}

const loginUser = async function (req, res) {
  try {
    let data = req.body;

    const { email, password } = data;

    // finding the user
    let user = await userModel.findOne({ email: email, isDeleted: false })
    if (!user) return res.status(404).send({ status: false, message: "User does not exist" })
    
    // password checking
    let actualPassWord = await bcrypt.compare(password, user.password);
    
    if (!actualPassWord) return res.status(400).send({ status: false, message: "Incorrect password" })

    // Token Generation
    let token = jwt.sign({ userId: user._id }, "Products-Management", {expiresIn: '1d'});

    res.setHeader('Authorization', token)
    res.status(200).send({ status: true, message: "User login successfully", data: { userId: user._id, token: token } })
  }catch (err) {
    res.status(500).send({ status: false, error: err.message })
  }
}

const getUser = async (req, res) => {
  try {
    let userName = req.params.userName;

    let getUserDoc = await userModel.findOne({ userName: userName, isDeleted: false });
    if(!getUserDoc) return res.status(404).send({ status: false, message: "User does not exist" })

    res.status(200).send({ status: true, message: "User profile", data: getUserDoc })
  } catch (err) {
    res.status(500).send({ status: false, message: "Internal server error", error: err.message })
  }
}

const updateUserProfile = async (req, res) => {
  try {
    let userName = req.params.userName;
    let data = req.body;
    let files = req.files;
    
    //getting the AWS-S3 link after uploading the user's profileImage
    if(files && files.length>0){
      let profileImgUrl = await uploadFile(files[0]);
      data.profileImage = profileImgUrl;
    }

    if(data?.password) {
      //hashing the password with bcrypt
      data.password = await bcrypt.hash(data.password, 10);
    }

    if(data?.email) {
      //checking if email already exist or not
      let checkEmail = await userModel.findOne({ email: data.email, isDeleted: false });
      if (checkEmail) return res.status(400).send({ status: false, message: "Email already exist" });
    }

    let updateUser = await User.findOneAndUpdate(
      {userName: userName},
      data,
      {new: true}
    )
    res.status(200).send({ status: true, message: "User profile updated", data: updateUser });
  } catch (err) {
    res.status(500).send({ status: false, message: "Internal server error", error: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    let userName = req.params.userName;

    await userModel.updateOne(
      {userName: userName},
      {isDeleted: true},
      {new: true}
    )
  } catch (err) {
    res.status(500).send({ status: false, message: "Internal server error", error: err.message })
  }
}

module.exports = { createUser, loginUser, getUser, updateUserProfile, deleteUser };