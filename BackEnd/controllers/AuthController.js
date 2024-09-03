import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
import User from "../models/User.js";

const sendVerifyMail = async (name, email, id) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_ID,
        pass: process.env.APP_PASSWORD,
      },
    });

    const url = `https://marketplacebackend-5jv3.onrender.com/api/v1/auth/verify?id=${id}`;

    const mailOptions = {
      from: "username@gmail.com",
      to: email,
      subject: "For Verification mail",
      html: `<p> Hi ${name}, please click here to <a href=${url}>Verify</a> your email.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been sent:- ", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const verify = async (req, res) => {
  try {
    const updateInfo = await User.updateOne(
      { _id: req.query.id },
      { $set: { verified: true } }
    );

    res.redirect("https://market-place-frontend-three.vercel.app/auth/login");
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "User Not found",
        },
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        EncryptedResponse: {
          success: false,
          status_code: 403,
          message:
            "User account is not verified. Please verify your account to proceed.",
        },
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        EncryptedResponse: {
          success: false,
          status_code: 401,
          message: "Invalid credentials",
        },
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const userWithoutPassword = { ...user._doc, password: undefined };

    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Logged in successfully!",
        data: {
          user: userWithoutPassword,
          token,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to login !",
      },
    });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        EncryptedResponse: {
          success: false,
          status_code: 409,
          message: "User already exists",
          data: {
            user: userWithoutPassword,
          },
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    if (savedUser) {
      sendVerifyMail(req.body.firstName, req.body.email, savedUser._id);
    }
    const userWithoutPassword = { ...savedUser._doc, password: undefined };

    res.status(201).json({
      EncryptedResponse: {
        success: true,
        status_code: 201,
        message: "User registered successfully !",
        data: {
          user: userWithoutPassword,
        },
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Server error",
      },
    });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Logged out successfully!",
      },
    });
  } catch (error) {
    res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Failed to logout!",
      },
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "User not found",
        },
      });
    }

    const token = jwt.sign({ mail: user.email }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_ID,
        pass: process.env.APP_PASSWORD,
      },
    });

    const url = `https://market-place-frontend-three.vercel.app/auth/change_password?token=${token}`;

    const mailOptions = {
      from: "username@gmail.com",
      to: email,
      subject: "For Password Change",
      html: `<p>Hi ${user.firstName}, please click here to <a href=${url}>change</a> your password.</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({
          EncryptedResponse: {
            success: false,
            status_code: 500,
            message: "Failed to send email",
          },
        });
      } else {
        console.log("Email has been sent: ", info.response);
      }
    });

    return res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Password reset link sent successfully",
      },
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Internal server error",
      },
    });
  }
};

const changePassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.mail;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        EncryptedResponse: {
          success: false,
          status_code: 404,
          message: "User not found",
          data: null,
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    const userWithoutPassword = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return res.status(200).json({
      EncryptedResponse: {
        success: true,
        status_code: 200,
        message: "Password updated successfully",
        data: {
          user: userWithoutPassword,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EncryptedResponse: {
        success: false,
        status_code: 500,
        message: "Internal server error",
      },
    });
  }
};

export { login, register, verify, logout, forgotPassword, changePassword };
