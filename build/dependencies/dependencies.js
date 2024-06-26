"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
exports.express = express_1.default;
exports.Router = express_1.Router;
const jsonwebtoken_1 = require("jsonwebtoken");
exports.sign = jsonwebtoken_1.sign;
const mongoose_1 = __importStar(require("mongoose"));
exports.mongoose = mongoose_1.default;
exports.Schema = mongoose_1.Schema;
exports.model = mongoose_1.model;
const winston_1 = __importDefault(require("winston"));
exports.winston = winston_1.default;
const joi_1 = __importDefault(require("joi"));
exports.Joi = joi_1.default;
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.bcrypt = bcrypt_1.default;
const socket_io_1 = require("socket.io");
exports.Server = socket_io_1.Server;
exports.Socket = socket_io_1.Socket;
