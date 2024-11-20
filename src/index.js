import "./styles/styles.css";

import Todo from "./modules/todo";
import Project from "./modules/project";

const myProject = new Project("First project");
const myTodo = new Todo(
  "finish project",
  "complete the app",
  "2024-12-01",
  "High"
);

function renderTodos(project) {
  const container = document.getElementById("todo-container");
  container.innerHTML = ""; // Clear existing content

  project.todos.forEach((todo, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");

    todoDiv.innerHTML = `
      <h3>${todo.title}</h3>
      <p>${todo.description}</p>
      <p>Due: ${todo.dueDate}</p>
      <p>Priority: ${todo.priority}</p>
      <button data-index="${index}" class="delete-btn">Delete</button>
    `;

    container.appendChild(todoDiv);
  });

  addDeleteListeners(project);
}

function addDeleteListeners(project) {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      project.todos.splice(index, 1); // Remove todo from the array
      renderTodos(project); // Re-render the updated list
    });
  });
}

myProject.addTodo(myTodo);
renderTodos(myProject);
console.log(myProject);
