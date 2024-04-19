"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../dependencies/dependencies");
const Model = new dependencies_1.Schema({
    username: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    salt: { type: String, require: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.userModel = dependencies_1.model("user", Model);
