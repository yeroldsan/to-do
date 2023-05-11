import { Todos } from "./class/Todo.js";
// Backend route
// const BACKEND_ROOT_URL = "https://todo-backend-ujqs.onrender.com";
const BACKEND_ROOT_URL = "http://localhost:3001";
// Create object  of Todos class
const todos = new Todos(BACKEND_ROOT_URL);
// Define the input element
const input = document.querySelector("#newtodo");
// User cannot add new task while data is retrieved
input.disabled = true;
// Get all the task from backend and render the view for each of them
todos
    .getTask()
    .then((tasks) => {
    tasks.forEach((task) => {
        renderTask(task);
    });
    input.disabled = false;
})
    .catch((error) => {
    alert(error);
});
// Add event listener keypress to input element to add new task
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        // event.preventDefault();
        const description = input.value.trim();
        if (description !== "") {
            todos.addTask(description).then((task) => {
                input.value = "";
                input.focus();
                renderTask(task);
            });
        }
        event.preventDefault();
    }
});
// Render the new task
const renderTask = (task) => {
    // Create a new list item element and set attributes
    let list_item = document.createElement("li");
    list_item.setAttribute("class", "list-group-item");
    list_item.setAttribute("data-key", task.id.toString());
    // Render the task description as a span element within the list item
    renderSpan(list_item, task.description);
    // Render a button to delete the task within the list item
    renderDeleteTask(list_item, task.id);
    // Render a button to update the task's description
    updateTask(list_item, task.id, task.completed);
    // Add a checkbox to mark the task as completed within the list item
    markTaskDone(list_item, task.id, task.completed);
    // Define list element
    const ulList = document.querySelector("#todolist");
    // Add the list item to the list element
    ulList.prepend(list_item);
};
// Render the new span element for description
const renderSpan = (list_item, description) => {
    //const ulList: HTMLUListElement = document.querySelector("#todolist")
    const span = document.createElement("span");
    list_item.appendChild(span);
    span.setAttribute("class", "mx-2");
    span.innerText = description;
};
// Delete task from the list
const renderDeleteTask = (list_item, id) => {
    let link = list_item.appendChild(document.createElement("a"));
    // link.innerHTML = '<i class="bi bi-trash mx-2"></i>'
    link.setAttribute("class", "bi bi-trash text-danger");
    link.style.float = "right";
    link.addEventListener("click", (event) => {
        todos
            .removeTask(id)
            .then((id) => {
            let elementToRemove = document.querySelector(`[data-key='${id}']`);
            if (elementToRemove) {
                const ulList = document.querySelector("#todolist");
                ulList.removeChild(elementToRemove);
            }
        })
            .catch((error) => {
            alert(error);
        });
    });
};
// Add new updateTask event
const updateTask = (list_item, id, completed) => {
    const link = document.createElement("a");
    if (completed != true) {
        list_item.appendChild(link);
    }
    // link.innerHTML = '<i class="bi bi-pencil mx-2"></i>'
    link.setAttribute("class", "bi bi-pencil mx-3");
    link.style.float = "right";
    link.addEventListener("click", (event) => {
        const oldDescription = list_item.querySelector("span").innerText;
        let newDescription = prompt("Enter new task description:", oldDescription);
        // If the user cancels the prompt, do nothing and return
        if (newDescription === null) {
            return;
        }
        // / If the user enters an empty description, prompt them again until they enter a valid description
        while (newDescription === "" || prompt === null) {
            alert("New description required");
            newDescription = prompt("Change your task", oldDescription);
            if (newDescription === null) {
                return;
            }
        }
        // If the user enters a valid description, update the task description
        if (newDescription !== oldDescription) {
            todos
                .updateTaskDescription(id, newDescription, completed)
                .then(() => {
                list_item.querySelector("span").innerHTML = newDescription;
            })
                .catch((error) => {
                alert(error);
            });
        }
        else {
            return;
        }
    });
};
// Mark task as done from the checkbox
const markTaskDone = (list_item, id, completed) => {
    // Select span to change
    const span = list_item.querySelector("span");
    // Create checkbox element
    const checkbox = list_item.appendChild(document.createElement("input"));
    // Set atrributes and style
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", `checkbox-${id}`);
    checkbox.setAttribute("class", "form-check-input");
    checkbox.style.float = "left";
    // Check if task in db checked true and render completed checkbox
    if (completed === true) {
        span.style.textDecorationLine = "line-through";
        checkbox.checked = true;
    }
    else {
        span.style.textDecorationLine = "none";
        checkbox.checked = false;
    }
    // Event when checkbox is checked
    checkbox.addEventListener("change", (event) => {
        if (checkbox.checked) {
            todos
                .markTaskAsDone(id, true)
                .then(() => {
                span.style.textDecorationLine = "line-through";
            })
                .catch((error) => {
                alert(error);
            });
        }
        else {
            todos.markTaskAsDone(id, false)
                .then(() => {
                span.style.textDecorationLine = "none";
                checkbox.checked = false;
            })
                .catch((error) => {
                alert(error);
            });
        }
    });
};
