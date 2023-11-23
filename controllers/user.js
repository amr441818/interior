import UserModel from "../models/user.js";

import {
  expectedErrorHandling,
  validationErrors,
  serverSideErrorHandling,
} from "../middleware/errorHandling.js";
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModel.find();
    res.json(allUsers);
  } catch (error) {
    serverSideErrorHandling(error, next);
  }
};
export const getSingleUser = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const user = await userModel.findById(_id);
    res.json(user);
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
export const createUser = async (req, res, next) => {
  validationErrors(req, next);
  const { name, job, email, mobile, country, bio, imageUrl } = req.body;
  //   const sIngrediens = ingredients.split(",");
  try {
    // if (!req.file) {
    //   expectedErrorHandling("No image added to file", 404);
    // }
    // const imageUrl = req.file.path.replace("\\", "/");
    // if (!title || !ingredients || !instructions) {
    //   clearImage(imageUrl);
    // }
    const newUser = new UserModel({
      name,
      job,
      bio,
      email,
      mobile,
      country,
      imageUrl,
    });

    const result = await newUser.save();
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
