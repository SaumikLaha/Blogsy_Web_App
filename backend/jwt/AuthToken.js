import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,  // secure 
    secure: true,       // required for HTTPS deploy
    sameSite: "none", // frontend-backend cross domain
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};

export default createTokenAndSaveCookies;