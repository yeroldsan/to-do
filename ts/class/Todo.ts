import { Task } from "./Task.js";

class Todos {
  tasks: Array<Task> = []
  #backend_url

  constructor(url) {
    this.#backend_url = url
  }

  #readJson(tasksAsJson: any): void {
    tasksAsJson.forEach(element => {
      const task = new Task(element.id, element.description,element.completed)
      this.tasks.push(task)
    })
  }

  #addToArray(id:number, description:string, completed: boolean) {
    let task = new Task(id,description, completed)
    this.tasks.push(task)
    return task
  }

  #updateTaskDescription(id: number, description:string, completed: boolean) {
    let task = new Task(id,description,completed)
    let index = this.tasks.findIndex(task => task.id === id)

    if (index >= 0) {
      this.tasks[index] = task;
    }
    return task
  }

  #removeTask(id: number): void {
    let arrayWithoutRemovedTask = this.tasks.filter(task => task.id !== id)
    this.tasks = arrayWithoutRemovedTask
  }

  #markTaskAsDone(id:number, completed: boolean) {
    let task = this.tasks.find((task) => task.id === id)
    if (task) {
      task.completed = true
    }
    return task
  }

  // Fetching data from the backend making HTTP call
  // JSON (array) received as response
  getTask = async () => {
    return new Promise(async (resolve,reject) => {
      fetch(this.#backend_url)
      .then(response => response.json())
      .then((data) => {
        this.#readJson(data)
        resolve(this.tasks)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  addTask = async (description:string) => {
    return new Promise(async (resolve,reject) => {
      const json = JSON.stringify({description:description})
      fetch(this.#backend_url + "/new",{
        method: "post",
        headers:{
            "Content-Type": "application/json"
        },
        body: json
      })
      .then((response) => response.json())
      .then((data) => {
        resolve(this.#addToArray(data.id,description,data.comleted))
      })
      .catch((error) => {
        reject(error)
        alert(error)
      })
    })
  }

  removeTask = (id: number) => {
    return new Promise(async (resolve, reject) => {
      fetch(this.#backend_url + "/delete/" + id,{
        method: "delete",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => response.json())
      .then((data) => {
        this.#removeTask(id)
        resolve(data.id)
      })
      .catch((error) => {
        reject(error)
        alert(error)
      })
    })
  }

  updateTask = (id:number, description:string) => {
    return new Promise(async (resolve,reject) => {
      let json = JSON.stringify({description:description})
      fetch(this.#backend_url + "/update/" + id, {
      method: "put",
      headers:{
          "Content-Type": "application/json"
      },
      body: json
      })
      .then(response => response.json())
      .then(data => {
      this.#updateTaskDescription(id, description,data.completed)
      resolve(data.description)
      })
      .catch((error) => {
      reject(error)
      })
    })
  }

  markTaskAsDone = async (id: number, completed: boolean) => {
    return new Promise(async (resolve, reject) => {
      let json = JSON.stringify({ completed: completed })
      fetch(this.#backend_url + "/update-status/" + id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      })
      .then((response) => response.json())
      .then((data) => {
        this.#markTaskAsDone(id,completed)
        resolve(data.completed)
      })
      .catch((error) => {
        reject(error)
      })
    })
  }  

}

export { Todos }