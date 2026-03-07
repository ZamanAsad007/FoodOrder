import express from "express";
const router = express.Router();
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "eKOTmDve2f9ulMcOoFSynVlDGyMgZcKrwJYRJ5pVUCO";

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

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        password: secPass,
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

      const pwdCompare = await bcrypt.compare(req.body.password, userData.password);

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: "Try Logging in with correct password" });
      }

      const data ={
        user:{
          id:userData.id,
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      return res.json({ success: true, authToken: authToken });
      
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
);

export default router;
