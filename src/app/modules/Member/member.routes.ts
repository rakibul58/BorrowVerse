import { Router } from "express";
import { MemberControllers } from "./member.controllers";
const router = Router();

router
  .route("/")
  .post(MemberControllers.createMember)

export const MemberRoutes = router;
