import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  users,
  signup,
  signin,
  logout,
  deleteUser,
  updateUser,
  verifyToken,
  profile,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { signupSchema, signinSchema } from "../schemas/auth.schema.js";

const router = Router();

router.get("/users", users);

router.post("/signup", validateSchema(signupSchema), signup);

router.post("/signin", validateSchema(signinSchema), signin);

router.post("/logout", logout);

router.delete("/users/:id", deleteUser);

router.put("/users/:id", updateUser);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

export default router;
