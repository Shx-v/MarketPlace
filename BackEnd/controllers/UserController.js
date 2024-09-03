import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "User fetched successfully !",
        data: {
          user: users,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching users.",
      },
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "-password");

    if (!user) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "User not found.",
        },
      });
    }

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Server error while fetching users.",
        data: {
          user,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error while fetching users.",
      },
    });
  }
};

export { getAllUsers, getUserById };
