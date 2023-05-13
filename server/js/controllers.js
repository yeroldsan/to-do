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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sql = `select * from task order by completed desc`;
        const result = yield (0, database_1.queryWithClient)(sql);
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const description = req.body.description;
        const completed = false;
        const sql = `insert into task (description, completed) values ($1, $2) returning *`;
        const result = yield (0, database_1.queryWithClient)(sql, [description, completed]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ id: rows[0].id });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        // const description: string = req.body.description;
        // const completed: boolean = req.body.completed;
        const { description, completed } = req.body;
        const sql = `update task set description = $1, completed = $2 where id= $3 returning *`;
        const result = yield (0, database_1.queryWithClient)(sql, [
            description,
            completed,
            id,
        ]);
        const rows = result.rows[0].id ? result.rows : [];
        res.status(200).json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const sql = `delete from task where id = $1`;
        yield (0, database_1.queryWithClient)(sql, [id]);
        res.status(200).json({ id: id });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
const statusTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = parseInt(req.params.id);
        const completed = req.body.completed;
        const sql = `update task set completed = $1 where id= $2 returning *`;
        const result = yield (0, database_1.queryWithClient)(sql, [completed, id]);
        const rows = (_a = result.rows) !== null && _a !== void 0 ? _a : []; // Same code as result.rows[0].id ? result.rows : []
        res.status(200).json(rows);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = { getAllTasks, createTask, updateTask, deleteTask, statusTask };
