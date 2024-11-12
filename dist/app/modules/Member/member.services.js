"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberServices = void 0;
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const prisma = new client_1.PrismaClient();
const createMemberIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.member.create({ data: payload });
    return result;
});
const getAllMembersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.member.findMany();
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "No Members Found");
    }
    return result;
});
const getMemberByIdFromDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.member.findUnique({
        where: {
            memberId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid member ID");
    }
    return result;
});
const updateMemberByIdInDB = (memberId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExists = yield prisma.member.findUnique({
        where: {
            memberId,
        },
    });
    if (!isMemberExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid member ID");
    }
    const result = yield prisma.member.update({
        where: { memberId },
        data: payload,
    });
    return result;
});
const deleteMemberByIdInDB = (memberId) => __awaiter(void 0, void 0, void 0, function* () {
    const isMemberExists = yield prisma.member.findUnique({
        where: {
            memberId,
        },
    });
    if (!isMemberExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, "Invalid member ID");
    }
    const result = yield prisma.member.delete({
        where: { memberId },
    });
    return result;
});
exports.MemberServices = {
    createMemberIntoDB,
    getAllMembersFromDB,
    getMemberByIdFromDB,
    updateMemberByIdInDB,
    deleteMemberByIdInDB,
};
