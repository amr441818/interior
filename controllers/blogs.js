import BlogModel from "../models/blog.js";

import {
  expectedErrorHandling,
  validationErrors,
  serverSideErrorHandling,
} from "../middleware/errorHandling.js";
export const getAllBlogs = async (req, res, next) => {
  const { page } = req.query;
  const LIMIT = 6;
  const skip = (page - 1) * LIMIT;
  try {
    const allBlogs = await BlogModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(skip);
    res.json(allBlogs);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
export const getSingleBlog = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const blog = await BlogModel.findById(_id);
    res.json(blog);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
export const getLatestBlog = async (req, res, next) => {
  try {
    const latestBlog = await BlogModel.find().sort({ createdAt: -1 }).limit(1);
    res.json(latestBlog);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
export const getLatestBlogs = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const latestBlogs = await BlogModel.find().sort({ createdAt: -1 }).limit(3);
    res.json(latestBlogs);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
// export const getRecipesBySearch = async (req, res, next) => {
//   const { searchQuery, ingredients } = req.query;
//   console.log(req.query);
//   try {
//     const title = new RegExp(searchQuery, "i");

//     let recipes = await RecipeModel.find({
//       $or: [{ title }, { ingredients: { $in: ingredients.split(",") } }],
//     });
//     res.status(200).json({ data: recipes });
//   } catch (error) {
//     serverSideErrorHandling(error, next);
//   }
// };
export const createBlog = async (req, res, next) => {
  validationErrors(req, next);
  const { title, imageUrl, description, subDescription, category } = req.body;
  try {
    const newBlog = new BlogModel({
      title,
      category,
      description,
      subDescription,
      imageUrl,
    });

    const result = await newBlog.save();
    res.status(201).json(result);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
// export const updateRecipe = async (req, res, next) => {
//   const { id: _id } = req.params;
//   validationErrors(req, next);
//   const { title, ingredients, instructions, image } = req.body;
//   const sIngrediens = ingredients.split(",");
//   try {
//     let updatedImagUrl = image;
//     if (req.file) {
//       updatedImagUrl = req.file.path.replace("\\", "/");
//     }

//     const updatedRecipe = await RecipeModel.findById(_id);
//     if (!updateRecipe) {
//       expectedErrorHandling("no recipe found", 404);
//     }
//     if (updateRecipe.imageUrl !== updatedImagUrl) {
//       clearImage(updatedRecipe.imageUrl);
//     }

//     updatedRecipe.title = title;
//     updatedRecipe.ingredients = ingredients;
//     updatedRecipe.instructions = instructions;
//     updatedRecipe.imageUrl = updatedImagUrl;

//     const result = await updatedRecipe.save();
//     res.status(201).json(result);
//   } catch (error) {
//     serverSideErrorHandling(error, next);
//   }
// };
// export const deleteRecipe = async (req, res, next) => {
//   const { id: _id } = req.params;
//   try {
//     const dRecipe = await RecipeModel.findById(_id);
//     if (!dRecipe) {
//       expectedErrorHandling("no recipe found", 404);
//     }
//     clearImage(dRecipe.imageUrl);

//     await RecipeModel.findByIdAndRemove(_id);
//     res.status(200).json({ message: "recipe deleted successfully" });
//   } catch (error) {
//     serverSideErrorHandling(error, next);
//   }
// };

// const clearImage = (filePath) => {
//   filePath = path.join(__dirname, "..", filePath);
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// };
