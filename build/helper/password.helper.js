"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dependencies_1 = require("../dependencies/dependencies");
const saltRounds = 10;
exports.passwordHashHelper = (body) => {
    let { username, email, password } = body;
    let salt = "";
    return new Promise((resolve, reject) => {
        dependencies_1.bcrypt.genSalt(saltRounds).then((salt) => {
            dependencies_1.bcrypt
                .hash(password, salt)
                .then((password) => {
                resolve({ username, email, password, salt });
            })
                .catch((err) => {
                reject(err);
            });
        });
    });
};
exports.checkPasswordHelper = (userPassword, userSalt) => {
    return new Promise((resolve, reject) => {
        dependencies_1.bcrypt
            .hash(userPassword, userSalt)
            .then((password) => {
            resolve(password);
        })
            .catch((err) => {
            reject(err);
        });
    });
};
