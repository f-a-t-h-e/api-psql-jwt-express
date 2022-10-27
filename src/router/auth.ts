import { Router } from "express";
import { login, register } from "../controllers/users";

const router: Router = Router();

router.post("/login", login);
router.post("/register", register);

export default router;
