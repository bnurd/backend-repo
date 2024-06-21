import { NextFunction, Request, Response } from "express";
import updateUser, { UpdateUserDTO } from "../repository/updateUser";
import ApiError from "../entities/ApiError";

const updateUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.name || !req.body.age || !req.body.telp || !req.body.address) {
    next(new ApiError(400, "All fields are required"));
    return;
  }

  const payload: UpdateUserDTO = {
    name: req.body.name,
    age: req.body.age,
    telp: req.body.telp,
    address: req.body.address,
  };

  try {
    const result = await updateUser(res.locals.user.uid, payload);

    return res.status(200).json({
      status: 200,
      message: "User Data Updated",
      data: result,
    });
  } catch (error: any) {
    next(new ApiError(500, error.message || "Something went wrong"));
  }
};

export default updateUserData;
