import { Task } from "./Task.js";

class Todos {
  tasks: Array<Task> = [];
  #backend_url = "";

  constructor(url) {
    this.#backend_url = url;
  }

  // Methods to get all the tasks and render view
  #readJson(tasksAsJson: Task[]): void {
    tasksAsJson.forEach((element) => {
      const task = new Task(element.id, element.description, element.completed);
      this.tasks.push(task);
    });
  }

  getTask = async () => {
    try {
      const response = await fetch(this.#backend_url);
      const data = await response.json();
      this.#readJson(data);
      return this.tasks;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting tasks from server');
    }
  };


  // Methods to add a new task (createTask)
  #addToArray(id: number, description: string): Task {
    const task: Task = new Task(id, description, false);
    this.tasks.push(task);
    return task;
  }

  addTask = async (description: string) => {
    try {
      const json = JSON.stringify({ description: description })
      const response = await fetch(`${this.#backend_url}/new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
      })
      const data = await response.json();  
      return this.#addToArray(data.id, description)
    } catch (error) {
      console.error(error);
      throw new Error("Failed to get tasks from backend");
    }
  };


  // Methods to remove a delete a task
  #removeTask(id: number): Task[] {
    let updatedTasks: Task[] = this.tasks.filter((task) => task.id !== id);
    return updatedTasks;
  }

  removeTask = async (id: number) => {
    try {
      const response = await fetch(`${this.#backend_url}/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      })
      this.#removeTask(id)
      return id
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete task")
    }
  }


  // Methods to update a task's description and completed
  #updateTaskDescription(id: number, description: string, completed: boolean): Task {
    let task: Task = new Task(id, description, completed);
    let index: number = this.tasks.findIndex((task) => task.id === id);

    if (index >= 0) {
      this.tasks[index] = task;
    }
    return task;
  }

  updateTaskDescription = async (id: number, description: string, completed: boolean) => {
    try {
      const jsonData = JSON.stringify({ description: description, completed: completed })
      const response = await fetch(`${this.#backend_url}/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: jsonData
      })
      const data = await response.json()
      this.#updateTaskDescription(data.id, data.description, data.completed)
      return data.desccription
    } catch (error) {
      console.error(error)
      throw new Error("Failed to update task")
    }
  }


  // Methods to mark task as done!
  #markTaskAsDone(id: number, completed: boolean): Task {
    const taskToMark = this.tasks.find((task) => task.id === id);
    if (taskToMark) {
      taskToMark.completed = completed;
    }
    return taskToMark;
  }

  markTaskAsDone = async (id: number, completed: boolean) => {
    try {
      const jsonData = JSON.stringify({ completed: completed })
      const response = await fetch(`${this.#backend_url}/update-status/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: jsonData
      })
      const data = await response.json()
      this.#markTaskAsDone(data.id, data.completed)
      return data.completed
    } catch (error) {
      console.error(error)
      throw new Error("Failed to retrive task completed data")
    }
  }

}

export { Todos };