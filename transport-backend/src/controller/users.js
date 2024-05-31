import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../util/db.js";
import Joi from "joi";

import dotenv from "dotenv";
dotenv.config();

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const registerUser = async (req, res) => {
  // Validate user registration data
  const { error } = validateUserRegistration(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    username: req.body.username,
    password: hashedPassword,
    full_name: req.body.full_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    role_id: req.body.role_id,
  };

  try {
    const result = await pool.query(
      "INSERT INTO users (username, password, full_name, email, phone_number, role_id) VALUES (?, ?, ?, ?, ?, ?)",
      [
        newUser.username,
        newUser.password,
        newUser.full_name,
        newUser.email,
        newUser.phone_number,
        newUser.role_id,
      ]
    );

    res.status(201).json({
      message: "User registered successfully.",
      user: { id: result.insertId, ...newUser },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error." });
  }
};

export const loginUser = async (req, res) => {
  // Check if user exists
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      req.body.username,
    ]);
    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid username or password." });

    // Validate password
    const user = rows[0];
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).json({ message: "Invalid username or password." });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error." });
  }
};

/**
 * Refresh JWT token
 * @param {*} req
 * @param {*} res
 */
export const refreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required." });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(403).json({ message: "Invalid or expired refresh token." });
  }
};

/**
 * Validate user registration data
 * @param {Object} userData - User registration data
 * @returns {Object} Validation result
 */
const validateUserRegistration = (userData) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(6).required(),
    full_name: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().max(20).required(),
    role_id: Joi.number().integer().required(),
  });

  return schema.validate(userData);
};
