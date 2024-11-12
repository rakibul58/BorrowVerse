import { Router } from "express";
import { BookControllers } from "./book.controllers";

const router = Router();
// book routes
router
  .route("/")
  .get(BookControllers.getAllBooks)
  .post(BookControllers.createBook);

router
  .route("/:bookId")
  .get(BookControllers.getBookByBookId)
  .put(BookControllers.updateBookById)
  .delete(BookControllers.deleteBookById);

export const BookRoutes = router;
