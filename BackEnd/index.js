import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./mongodb/connect.js";
import UserRouter from "./routes/UserRoutes.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import ServiceRoutes from "./routes/ServiceRoutes.js";
import ProviderRoutes from "./routes/ProviderRoutes.js";
import OrderRoutes from "./routes/OerderRoutes.js";
import { upload } from "./middleware/multerUpload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/providers", ProviderRoutes);
app.use("/api/v1/services", ServiceRoutes);
app.use("/api/v1/orders", OrderRoutes);

app.post("/api/v1/upload", upload.single("image"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

const startServer = async () => {
  try {
    connectDB(
      process.env.MONGODB_URL
    );

    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
