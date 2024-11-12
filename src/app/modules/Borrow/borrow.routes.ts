import { Router } from "express";
import { BorrowControllers } from "./borrow.controllers";

const router = Router();

router.route("/").post(BorrowControllers.borrowBook);
router.route("/overdue").get(BorrowControllers.getOverDueBooks);

export const BorrowRoutes = router;
