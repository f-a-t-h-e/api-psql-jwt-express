import { Router } from "express";
import { Delete, getAll, getOne, update } from "../controllers/users";

const router: Router = Router();

router.route("/").get(getAll).patch(update).delete(Delete);
router.get("/:id", getOne);

export default router;
