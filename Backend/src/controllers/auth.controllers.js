import {
  userLogin,
  userSignup,
  userLogout,
  userProfileUpdate,
} from "../services/auth.service.js";

const signup = async (req, res) => {
  try {
    const user = await userSignup(req.body, res);

    console.log("user", user);
    res
      .status(201)
      .json({ message: "User signed up successfully", data: user });
  } catch (error) {
    res.status(500).json({
      message: "Error during user signup",
      error: error.message,
    });
  }
  // res.status(200).json({
  //   message: "User signed up successfully",
  // });
};

const login = async (req, res) => {
  try {
    const user = await userLogin(
      { email: req.body.email, password: req.body.password },
      res
    );
    res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during user Login ", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await userLogout(res);

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error during user logout", error: error.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const user = await userProfileUpdate(req.body, req.user._id);
    res.status(200).json({
      message: "User profile Picture updated successfully",
      data: user,
    });
    // console.log("User profile updated:", user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user profile", error: error.message });
  }
};

const checkUser =(req, res) => {
  try {
    res.status(200).json({
      message: "User is authenticated",
      data: req.user,
    });
  } catch (error) {
    // console.log("error in checkUser:", error);
    res
      .status(500)
      .json({ message: "UInternal server error", error: error.message });
  }
};

export { signup, login, logout, userProfile,checkUser };
