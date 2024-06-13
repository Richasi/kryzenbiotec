const { Router } = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/schema");
const userRouter = Router();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// user/signup
userRouter.post("/signup", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const result = await UserModel.findOne({ where: { email } });
  
      if (result) {
        return res.status(200).send("User already exists");
      }
  
      const hashedPassword = await bcrypt.hash(password, 4);
      const user = await UserModel.create({ name, email, password: hashedPassword });
      res.status(200).send("Sign up successful");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong, please try again later");
    }
  });

// user/login
userRouter.post("/login", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await UserModel.findOne({ where: { email } });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const passwordResult = await bcrypt.compare(password, user.password);
      if (!passwordResult) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ userID: user.id }, process.env.JWT_SECRET_KEY);
      res.json({ msg: "Login successful", token });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send("Something went wrong in Login, please try again later");
    }
  });

module.exports = { userRouter };
