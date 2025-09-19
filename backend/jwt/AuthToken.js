import jwt from "jsonwebtoken";

import { User } from "../models/user.model.js";

const createTokenAndSaveCookies = async (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "14d",
  });
  res.cookie("jwt", token, {
    httpOnly: false, // prevents client-side JS from accessing cookie (XSS protection)
    secure: true, // cookie will only be sent over HTTPS
    sameSite: "none", // prevents CSRF by blocking cross-site requests
  });

  await User.findByIdAndUpdate(userId, { token });
  return token;
};

export default createTokenAndSaveCookies;
