import express from "express";
import { blogValidations } from "../middleware/errorHandling.js";
const router = express.Router();
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  getLatestBlog,
  getLatestBlogs
} from "../controllers/blogs.js";
router.get("/blogs", getAllBlogs);
router.get("/blogs/:id", getSingleBlog);
router.get("/latestBlog", getLatestBlog);
router.get("/latestBlogs", getLatestBlogs);
router.post("/blogs", blogValidations(), createBlog);


export default router;
