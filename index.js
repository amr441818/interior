import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import blogRoutes from "./routes/blogs.js";
const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
// );
app.use("/api", userRoutes);
app.use("/api", blogRoutes);

app.use((error, req, res, next) => {
  const message = error.message;
  const statusCode = error.statusCode;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data });
});

mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    app.listen(process.env.PORT || 3000, () =>
      console.log(`server running in port ${process.env.PORT || 3000}`)
    );
  })
  .catch((error) => console.log(error.message));
