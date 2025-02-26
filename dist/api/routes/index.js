"use strict";
//this is where we register our routes
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("./users");
const router = (0, express_1.Router)();
router.use('/users', users_1.userRoutes);
exports.default = router;
