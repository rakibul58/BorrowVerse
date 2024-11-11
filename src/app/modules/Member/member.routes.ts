import { Router } from "express";
import { MemberControllers } from "./member.controllers";
const router = Router();

router
  .route("/")
  .get(MemberControllers.getAllMembers)
  .post(MemberControllers.createMember);

router.route("/:memberId").get(MemberControllers.getMemberByMemberId);

export const MemberRoutes = router;
