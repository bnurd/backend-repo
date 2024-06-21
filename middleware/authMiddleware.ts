import { NextFunction, Request, Response } from "express";
import ApiError from "../entities/ApiError";
import Admin from "../config/firebaseAdminConfig";
import { FirebaseAuthError } from "firebase-admin/auth";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }
    const decode = await Admin.auth().verifyIdToken(token);
    if (!decode) throw new ApiError(401, "Unauthorized");
    res.locals.user = decode;
    next();
  } catch (error) {
    if (error instanceof ApiError)
      return res.status(error.status).json({
        status: error.status,
        message: error.message,
      });

    if (error instanceof FirebaseAuthError)
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });

    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default authMiddleware;
