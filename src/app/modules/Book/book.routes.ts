import { Router } from "express";
import { BookControllers } from "./book.controllers";

const router = Router();

router
  .route("/")
  .get(BookControllers.getAllBooks)
  .post(BookControllers.createBook);

router.route("/:id").get(BookControllers.getBookByBookId);

export const BookRoutes = router;
