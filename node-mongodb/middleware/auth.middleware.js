/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) {
      return next();
    }

    if (!tokenHeader.startsWith("Bearer")) {
      return res
        .status(400)
        .json({ errer: "the token header must be start with bearer " });
    }

    const token = tokenHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decode;
    return next();
  } catch (error) {
    next();
  }
};

export const ensureAuthenticated = async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ error: "you must be authenticared to acces this " });
  }
  next();
};
