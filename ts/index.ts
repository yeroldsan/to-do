import { Task } from "./class/Task.js";
import { Todos } from "./class/Todo.js";

// Backend route
const BACKEND_ROOT_URL = "http://localhost:3001";

// Charge all the DOM content before JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Create object  of Todos class
  const todos = new Todos(BACKEND_ROOT_URL);

  const list = <HTMLUListElement>document.querySelector("#todolist");
  const input = <HTMLInputElement>document.querySelector("#newtodo");

  // User cannot add new task while data is retrieved
  input.disabled = true;

  todos
    .getTask()
    .then((tasks: Array<Task>) => {
      tasks.forEach((task) => {
        renderTask(task);
      });
      input.disabled = false;
    })
    .catch((error) => {
      alert(error);
    });

  // Listener event to add new task
  const insertNewTask = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const description = input.value.trim();
      if (description !== "") {
        todos.addTask(description)
        .then((task) => {
          input.value = "";
          input.focus();
          renderTask(<Task>task);
        });
      }
      event.preventDefault();
    }
  };

  // Add event listener keypress to input element
  input.addEventListener("keypress", insertNewTask);

  // Render the new task
  const renderTask = (task: Task) => {
    let list_item: HTMLLIElement = document.createElement("li");
    list_item.setAttribute("class", "list-group-item");
    list_item.setAttribute("data-key", task.id.toString());
    renderSpan(list_item, task.description);
    renderDeleteTask(list_item, task.id);
    updateTask(list_item, task.id);
    markTaskDone(list_item, task.id);

    list.append(list_item);
  };

  // Render the new span element
  const renderSpan = (list_item: HTMLLIElement, description: string) => {
    let span = list_item.appendChild(document.createElement("span"));
    span.innerText = description;
  };

  const renderDeleteTask = (list_item: HTMLLIElement, id: number) => {
    let link = list_item.appendChild(document.createElement("a"));
    // link.innerHTML = '<i class="bi bi-trash mx-2"></i>'
    link.setAttribute("class", "bi bi-trash mx-2 text-danger");
    link.style.float = "right";

    link.addEventListener("click", (event: MouseEvent) => {
      todos
        .removeTask(id)
        .then((id) => {
          let elementToRemove: HTMLLIElement = document.querySelector(`[data-key='${id}']`);
          if (elementToRemove) {
            list.removeChild(elementToRemove);
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
  };

  // Add new updateTask event
  const updateTask = (list_item: HTMLLIElement, id: number) => {
    let link = list_item.appendChild(document.createElement("a"));
    // link.innerHTML = '<i class="bi bi-pencil mx-2"></i>'
    link.setAttribute("class", "bi bi-pencil mx-2");
    link.style.float = "right";

    link.addEventListener("click", (event: MouseEvent) => {
      let oldDescription = list_item.querySelector("span").innerText;
      let new_description = prompt(
        "Enter new task description:",
        oldDescription
      );
      if (new_description !== "") {
        todos.updateTask(id, new_description)
          .then(() => {
            list_item.querySelector("span").innerHTML = new_description;
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        alert("New description required");
      }
    });
  };

  const markTaskDone = (list_item: HTMLLIElement, id: number) => {
    let checkbox = list_item.appendChild(document.createElement("input"))
    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("id", `checkbox-${id}`)
    checkbox.setAttribute("class", "form-check-input mx-2")
    checkbox.style.float = "left"

    let span = list_item.querySelector("span");
    checkbox.addEventListener("change", (event: Event) => {
      if (checkbox.checked) {
        todos.markTaskAsDone(id, true)
        .then(() => {
          span.style.textDecorationLine = "line-through"
        })
        .catch((error) => {
          alert(error)
        })
      } else {
        todos.markTaskAsDone(id, false);
        span.style.textDecorationLine = "none"
      }
    })
  }
})
