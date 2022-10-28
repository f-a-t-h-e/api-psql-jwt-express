import { Router } from "express";
// import orders from "./orders";
import products from "./products";
import users from "./users";
import authorization from "../middlewares/auth";
import authantication from "./auth";

const router: Router = Router();

router.use("/api/v1/products", products);
// router.use("/api/v1/orders", authorization, orders);
router.use("/api/v1/users", authorization, users);
router.use("/", authantication);

export default router;
