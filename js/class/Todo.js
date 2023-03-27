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
var _Todos_instances, _Todos_backend_url, _Todos_readJson, _Todos_addToArray, _Todos_updateTaskDescription, _Todos_removeTask, _Todos_markTaskAsDone;
import { Task } from "./Task.js";
class Todos {
    constructor(url) {
        _Todos_instances.add(this);
        this.tasks = [];
        _Todos_backend_url.set(this, void 0);
        // Fetching data from the backend making HTTP call
        // JSON (array) received as response
        this.getTask = () => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f"))
                    .then(response => response.json())
                    .then((data) => {
                    __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_readJson).call(this, data);
                    resolve(this.tasks);
                })
                    .catch((error) => {
                    reject(error);
                });
            }));
        });
        this.addTask = (description) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const json = JSON.stringify({ description: description });
                fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f") + "/new", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: json
                })
                    .then((response) => response.json())
                    .then((data) => {
                    resolve(__classPrivateFieldGet(this, _Todos_instances, "m", _Todos_addToArray).call(this, data.id, description, data.comleted));
                })
                    .catch((error) => {
                    reject(error);
                    alert(error);
                });
            }));
        });
        this.removeTask = (id) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f") + "/delete/" + id, {
                    method: "delete",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                    .then(response => response.json())
                    .then((data) => {
                    __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_removeTask).call(this, id);
                    resolve(data.id);
                })
                    .catch((error) => {
                    reject(error);
                    alert(error);
                });
            }));
        };
        this.updateTask = (id, description) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let json = JSON.stringify({ description: description });
                fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f") + "/update/" + id, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: json
                })
                    .then(response => response.json())
                    .then(data => {
                    __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_updateTaskDescription).call(this, id, description, data.completed);
                    resolve(data.description);
                })
                    .catch((error) => {
                    reject(error);
                });
            }));
        };
        this.markTaskAsDone = (id, completed) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let json = JSON.stringify({ completed: completed });
                fetch(__classPrivateFieldGet(this, _Todos_backend_url, "f") + "/update-status/" + id, {
                    method: "put",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: json,
                })
                    .then((response) => response.json())
                    .then((data) => {
                    __classPrivateFieldGet(this, _Todos_instances, "m", _Todos_markTaskAsDone).call(this, id, completed);
                    resolve(data.completed);
                })
                    .catch((error) => {
                    reject(error);
                });
            }));
        });
        __classPrivateFieldSet(this, _Todos_backend_url, url, "f");
    }
}
_Todos_backend_url = new WeakMap(), _Todos_instances = new WeakSet(), _Todos_readJson = function _Todos_readJson(tasksAsJson) {
    tasksAsJson.forEach(element => {
        const task = new Task(element.id, element.description, element.completed);
        this.tasks.push(task);
    });
}, _Todos_addToArray = function _Todos_addToArray(id, description, completed) {
    let task = new Task(id, description, completed);
    this.tasks.push(task);
    return task;
}, _Todos_updateTaskDescription = function _Todos_updateTaskDescription(id, description, completed) {
    let task = new Task(id, description, completed);
    let index = this.tasks.findIndex(task => task.id === id);
    if (index >= 0) {
        this.tasks[index] = task;
    }
    return task;
}, _Todos_removeTask = function _Todos_removeTask(id) {
    let arrayWithoutRemovedTask = this.tasks.filter(task => task.id !== id);
    this.tasks = arrayWithoutRemovedTask;
}, _Todos_markTaskAsDone = function _Todos_markTaskAsDone(id, completed) {
    let task = this.tasks.find((task) => task.id === id);
    if (task) {
        task.completed = completed;
    }
    return task;
};
export { Todos };
