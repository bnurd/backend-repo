import express, { Request, Response } from "express";
import cors from "cors";
import userRoutes from "../routes/userRoutes";
import ApiError from "../entities/ApiError";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(userRoutes);

app.use((err: any, req: Request, res: Response) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }
  return res.status(500).json({
    status: 500,
    message: err.message,
  });
});

app.listen(3002, () => {
  console.log("Server is listening on port 3002");
});
