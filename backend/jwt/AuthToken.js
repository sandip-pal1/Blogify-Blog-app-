import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "14d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // prevents client-side JS from accessing cookie (XSS protection)
    secure: process.env.NODE_ENV === "production", // cookie will only be sent over HTTPS
    sameSite: "strict", // prevents CSRF by blocking cross-site requests
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
