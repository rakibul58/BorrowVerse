import { Router } from "express";
import { ReturnControllers } from "./return.controllers";

const router = Router();

router.route("/").post(ReturnControllers.returnBook);

export const ReturnRoutes = router;
