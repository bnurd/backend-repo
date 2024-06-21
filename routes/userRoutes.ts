import express from "express";
import fetchUserData from "../controller/fetchUserData";
import authMiddleware from "../middleware/authMiddleware";
import updateUserData from "../controller/updateUserData";

const router = express.Router();

router.get("/fetch-user-data", authMiddleware, fetchUserData);
router.put("/update-user-data", authMiddleware, updateUserData);

export default router;
