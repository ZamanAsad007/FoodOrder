import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { body, validationResult } from "express-validator";

router.post(
  "/createuser",
  body("email").isEmail(),
  body("name").isLength({ min: 4 }),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        password: req.body.password,
        email: req.body.email,
      });
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try Logging in with correct mail" });
      }
      if (userData.password !== req.body.password) {
        return res
          .status(400)
          .json({ errors: "Try Logging in with correct password" });
      }
      return res.json({ success: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

export default router;
