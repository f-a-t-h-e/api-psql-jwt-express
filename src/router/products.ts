import { Router } from "express";
import {
  create,
  Delete,
  getAll,
  getOne,
  getTop,
  update,
} from "../controllers/products";
import auth from "../middlewares/auth";
const router: Router = Router();

router.route("/").get(getAll).post(auth, create);
router.route("/top/:num").get(getTop);
router.route("/:id").get(getOne).patch(auth, update).delete(auth, Delete);

export default router;
