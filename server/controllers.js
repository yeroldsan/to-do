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
const database_1 = __importDefault(require("./database"));
const getAllTasks = (req, res) => {
    let pool = (0, database_1.default)();
    pool.query("select * from task", (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(result.rows);
    });
};
const createTask = (req, res) => {
    let pool = (0, database_1.default)();
    pool.query("insert into task (description) values ($1) returning *", [req.body.description], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
};
const updateTask = (req, res) => {
    let pool = (0, database_1.default)();
    let id = req.params.id;
    let description = req.body.description;
    pool.query("update task set description = $1 where id= $2 returning *", [description, id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
};
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let pool = (0, database_1.default)();
    let id = parseInt(req.params.id);
    pool.query("delete from task where id = $1", [id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: id });
    });
});
const statusTask = (req, res) => {
    let pool = (0, database_1.default)();
    let id = req.params.id;
    let completed = req.body.completed;
    pool.query("update task set completed = $1 where id= $2 returning *", [completed, id], (error, result) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json({ id: result.rows[0].id });
    });
};
exports.default = { getAllTasks, createTask, updateTask, deleteTask, statusTask };
