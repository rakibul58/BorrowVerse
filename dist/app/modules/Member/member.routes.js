"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRoutes = void 0;
const express_1 = require("express");
const member_controllers_1 = require("./member.controllers");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(member_controllers_1.MemberControllers.getAllMembers)
    .post(member_controllers_1.MemberControllers.createMember);
router
    .route("/:memberId")
    .get(member_controllers_1.MemberControllers.getMemberByMemberId)
    .put(member_controllers_1.MemberControllers.updateMemberById)
    .delete(member_controllers_1.MemberControllers.deleteMemberById);
exports.MemberRoutes = router;
