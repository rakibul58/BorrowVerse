import { Router } from "express";
import { BookRoutes } from "../modules/Book/book.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
