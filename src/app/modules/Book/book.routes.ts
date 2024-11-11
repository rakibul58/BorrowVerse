import { Router } from "express";
import { BookControllers } from "./book.controllers";

const router = Router();

router.route("/").post(BookControllers.createBook);

export const BookRoutes = router;
