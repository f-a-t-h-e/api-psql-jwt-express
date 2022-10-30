import { Router } from "express";
import { Delete, getAll, getOne, update } from "../controllers/users";

const router: Router = Router();
//                           no need to pass the id in the url since it's a must to update your account only
router.route("/").get(getAll).patch(update).delete(Delete);
router.get("/:id", getOne);

export default router;
