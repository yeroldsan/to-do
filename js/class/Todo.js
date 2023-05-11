var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Todos_instances, _Todos_backend_url, _Todos_readJson, _Todos_addToArray, _Todos_removeTask, _Todos_updateTaskDescription, _Todos_markTaskAsDone;
import { Task } from "./Task.js";
class Todos {
    constructor(url) {
        _Todos_instances.add(this);
        this.tasks = [];
        _Todos_backend_url.set(this, "");
        // Fetching data from the backend making HTTP call JSON (array) received as response
        // getTask = async () => {
        //   return new Promise(async (resolve, reject) => {
        //     fetch(this.#backend_url)
        //       .then((response) => response.json())
        //       .then((data) => {
        //         this.#readJson(data);
        //         console.log(data);    
        //         resolve(this.tasks);
        //         console.log(this.tasks);
        //       })
        //       .catch((error) => {
        //         reject(error);
        //       });
        //   });
        // };
        this.getTask = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f"));
                const data = yield response.json();
                __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_readJson).call(this, data);
                return this.tasks;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error getting tasks from server');
            }
        });
        this.addTask = (description) => __awaiter(this, void 0, void 0, function* () {
            try {
                const json = JSON.stringify({ description: description });
                const response = yield fetch(`${__classPrivateFieldGet(this, _Todos_backend_url, "f")}/new`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: json,
                });
                const data = yield response.json();
                return __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_addToArray).call(this, data.id, description);
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to get tasks from backend");
            }
        });
        this.removeTask = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`${__classPrivateFieldGet(this, _Todos_backend_url, "f")}/delete/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });
                __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_removeTask).call(this, id);
                return id;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to delete task");
            }
        });
        this.updateTaskDescription = (id, description, completed) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = JSON.stringify({ description: description, completed: completed });
                const response = yield fetch(`${__classPrivateFieldGet(this, _Todos_backend_url, "f")}/update/${id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: jsonData
                });
                const data = yield response.json();
                __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_updateTaskDescription).call(this, data.id, data.description, data.completed);
                return data.desccription;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to update task");
            }
        });
        this.markTaskAsDone = (id, completed) => __awaiter(this, void 0, void 0, function* () {
            try {
                const jsonData = JSON.stringify({ completed: completed });
                const response = yield fetch(`${__classPrivateFieldGet(this, _Todos_backend_url, "f")}/update-status/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: jsonData
                });
                const data = yield response.json();
                __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_markTaskAsDone).call(this, data.id, data.completed);
                return data.completed;
            }
            catch (error) {
                console.error(error);
                throw new Error("Failed to retrive task completed data");
            }
        });
        __classPrivateFieldSet(this, _Todos_backend_url, url, "f");
    }
}
_Todos_backend_url = new WeakMap(), _Todos_instances = new WeakSet(), _Todos_readJson = function _Todos_readJson(tasksAsJson) {
    tasksAsJson.forEach((element) => {
        const task = new Task(element.id, element.description, element.completed);
        this.tasks.push(task);
    });
}, _Todos_addToArray = function _Todos_addToArray(id, description) {
    const task = new Task(id, description, false);
    this.tasks.push(task);
    return task;
}, _Todos_removeTask = function _Todos_removeTask(id) {
    let updatedTasks = this.tasks.filter((task) => task.id !== id);
    return updatedTasks;
}, _Todos_updateTaskDescription = function _Todos_updateTaskDescription(id, description, completed) {
    let task = new Task(id, description, completed);
    let index = this.tasks.findIndex((task) => task.id === id);
    if (index >= 0) {
        this.tasks[index] = task;
    }
    return task;
}, _Todos_markTaskAsDone = function _Todos_markTaskAsDone(id, completed) {
    const taskToMark = this.tasks.find((task) => task.id === id);
    if (taskToMark) {
        taskToMark.completed = completed;
    }
    return taskToMark;
};
export { Todos };
