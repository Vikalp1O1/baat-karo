import cloudinary from "../lib/cloudinary.js";
import { generatetoken } from "../middlewares/token.jwt.js";
import User from "../models/user.model.js";
import bcrypt, { genSalt } from "bcryptjs";

const userSignup = async ({ fullName, email, password, profilePic }, res) => {
  try {
    // user checking if already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // hash the password
    const salt = await genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    if (savedUser) {
      generatetoken(savedUser._id, res);
    }
    return savedUser;
  } catch (error) {
    // console.error("Error during user signup:", error);
    throw new Error("Error during user signup: " + error.message);
  }
};

const userLogin = async ({ email, password }, res) => {
  try {
    // Check if user exists
    const loginuser = await User.findOne({ email });
    if (!loginuser) {
      throw new Error("User does not exist");
    }
    // now check the password

    const passwordMatch = await bcrypt.compare(password, loginuser.password);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    // now generate token
    generatetoken(loginuser._id, res);
    return loginuser;
  } catch (error) {
    // console.log("Error during user login:", error.message);
    throw new Error(error.message);
 }
};

const userLogout = async (res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
  } catch (error) {
    throw new Error("Error during user logout: " + error.message);
  }
};

const userProfileUpdate = async (
  { fullName, email, profilePic, _id },
  userId
) => {
  try {
    const userID = userId;

    const user = await User.findById(userID);
    if (!profilePic) {
      throw new Error("Profile picture is required");
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    return updatedUser;
  } catch (error) {
    throw new Error("Error during user profile update: " + error.message);
  }
};

export { userSignup, userLogin, userLogout, userProfileUpdate };