import jwt from "jsonwebtoken";

export const authenticationMiddleware = async function (req, res, next) {
  try {
    // Header authorization bearer <token>
    const tokenHeader = req.headers["authorization"];

    // 1. Check if header exists
    if (!tokenHeader) {
      return next();
    }

    // 2. Check for Bearer prefix and RETURN to stop execution
    if (!tokenHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ errer: "authorization header mst be start with bearer" });
    }

    const token = tokenHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next();
  }
};
// to ensure the user is login
export const ensureAuthenticated = async function (req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "you must be authenticated" });
  }
  next();
};
//to insure the user is acces to get the user as a admin
export const restrictToRole = function (role) {
  return function (req, res, next) {
    if (req.user.role !== role) {
      return res
        .status(401)
        .json({ errer: "you are not authorize to access this role" });
    }
    next();
  };
};
