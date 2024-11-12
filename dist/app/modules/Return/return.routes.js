"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnRoutes = void 0;
const express_1 = require("express");
const return_controllers_1 = require("./return.controllers");
const router = (0, express_1.Router)();
router.route("/").post(return_controllers_1.ReturnControllers.returnBook);
exports.ReturnRoutes = router;
