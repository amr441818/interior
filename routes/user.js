import express from "express";
import { userValidations } from "../middleware/errorHandling.js";
const router = express.Router();
import { createUser, getAllUsers, getSingleUser } from "../controllers/user.js";
router.get("/users", getAllUsers);
router.get("/users/:id", getSingleUser);
// router.get("/search", getRecipesBySearch);
router.post("/users", userValidations(), createUser);
// router.put("/recipe/:id", recipeValidations(), updateRecipe);
// router.delete("/recipe/:id", deleteRecipe);

export default router;
