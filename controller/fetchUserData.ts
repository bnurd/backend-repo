import { Request, Response } from "express";
import getUser from "../repository/getUser";

const fetchUserData = async (req: Request, res: Response) => {
  const users = await getUser(res.locals.user.uid);

  return res.status(200).json({
    status: 200,
    message: "User Data Fetched",
    data: {
      uid: users.id,
      ...users.data(),
    },
  });
};

export default fetchUserData;
