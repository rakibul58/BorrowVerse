"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = require("express");
const book_controllers_1 = require("./book.controllers");
const router = (0, express_1.Router)();
// book routes
router
    .route("/")
    .get(book_controllers_1.BookControllers.getAllBooks)
    .post(book_controllers_1.BookControllers.createBook);
router
    .route("/:bookId")
    .get(book_controllers_1.BookControllers.getBookByBookId)
    .put(book_controllers_1.BookControllers.updateBookById)
    .delete(book_controllers_1.BookControllers.deleteBookById);
exports.BookRoutes = router;
