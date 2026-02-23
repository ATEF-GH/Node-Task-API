import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function (req, res, next) {
  try {
    const jwtToken = req.header("Authorization");

    if (!jwtToken) {
      return res.status(403).json("Authorization Denied");
    }

    const token = jwtToken.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload.user;

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json("Token is not valid");
  }
}
