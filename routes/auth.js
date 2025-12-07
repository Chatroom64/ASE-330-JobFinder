import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../database.js";
import { authMiddleware } from "../middleware/auth.js";
import { ObjectId } from "mongodb";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // set in .env

// ----------------------
// SIGN UP
// ----------------------
router.post("/signup", async (req, res) => {
    const db = getDB();
    const users = db.collection("Users");

    const { username, email, password } = req.body;

    try {
        // Check if email exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = {
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
        resume: '',
        keywords: ''
        };

        await users.insertOne(newUser);

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

// ----------------------
// SIGN IN
// ----------------------
router.post("/signin", async (req, res) => {
  //console.log("Sign in was called");
  const db = getDB();
  const users = db.collection("Users");

  const { email, password } = req.body;

  try {
    // Find user
    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("Sign in Token created: ")
    console.log(token)
    res.json({
      message: "Logged in successfully",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// Protected endpoint
router.get("/me", authMiddleware, async (req, res) => {
  //console.log("Auth/me request");
  //console.log(req.method, req.path, req.headers);
  try {
    const db = getDB();
    const users = db.collection("Users");

    // req.user contains decoded JWT payload (e.g., id)
    const user = await users.findOne({ _id: new ObjectId(req.user.id) });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Send only safe info, not password
    const { password, ...safeUser } = user;
    res.json({ user: safeUser });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
