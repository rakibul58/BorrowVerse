import { Router } from "express";
import { BorrowControllers } from "./borrow.controllers";

const router = Router();

router.route("/").post(BorrowControllers.borrowBook);

export const BorrowRoutes = router;
