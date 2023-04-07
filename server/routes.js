"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = __importDefault(require("./controllers"));
const router = express_1.default.Router();
router
    .get("/", controllers_1.default.getAllTasks)
    .post("/new", controllers_1.default.createTask)
    .delete("/delete/:id", controllers_1.default.deleteTask)
    .put("/update/:id", controllers_1.default.updateTask)
    .patch("/update-status/:id", controllers_1.default.statusTask);
exports.default = router;
