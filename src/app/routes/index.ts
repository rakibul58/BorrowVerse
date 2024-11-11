import { Router } from "express";
import { BookRoutes } from "../modules/Book/book.routes";
import { MemberRoutes } from "../modules/Member/member.routes";
import { BorrowRoutes } from "../modules/Borrow/borrow.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
  {
    path: "/borrow",
    route: BorrowRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
