import "./styles/styles.css";

import Todo from "./modules/todo";
import Project from "./modules/project";

// Form and input references
const form = document.getElementById("todo-form");
const titleInput = document.getElementById("todo-title");
const descriptionInput = document.getElementById("todo-description");
const dueDateInput = document.getElementById("todo-due-date");
const prioritySelect = document.getElementById("todo-priority");

// Project instance
const myProject = new Project("First project");

// Example Todo
const myTodo = new Todo(
  "finish project",
  "complete the app",
  "2024-12-01",
  "High"
);
myProject.addTodo(myTodo);

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value.trim();
  const priority = prioritySelect.value.trim();

  // Log values of the fields to inspect what they contain
  console.log("Title:", title);
  console.log("Description:", description);
  console.log("Due Date:", dueDate);
  console.log("Priority:", priority);

  // Check if any of the fields are empty after trimming
  if (title === "" || description === "" || dueDate === "" || priority === "") {
    alert("Please fill in all fields.");
    return; // Exit the function if fields are missing
  }

  // If all fields are filled, create a new todo
  const newTodo = new Todo(title, description, dueDate, priority);
  myProject.addTodo(newTodo); // Add the todo to the project

  renderTodos(myProject); // Re-render the todos
  form.reset(); // Reset the form fields after submission
});

// Render todos
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
      <button data-index="${index}" class="edit-btn">Edit</button>
      <button data-index="${index}" class="delete-btn">Delete</button>
    `;

    container.appendChild(todoDiv);
  });
  addEditListeners(project);
  addDeleteListeners(project);
}


function addEditListeners(project) {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const todoToEdit = project.todos[index];

      // Pre-fill the form with the todo's details
      titleInput.value = todoToEdit.title;
      descriptionInput.value = todoToEdit.description;
      dueDateInput.value = todoToEdit.dueDate;
      prioritySelect.value = todoToEdit.priority;

      // Update the submit handler to update the existing todo instead of creating a new one
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dueDateInput.value.trim();
        const priority = prioritySelect.value.trim();

        if (
          title === "" ||
          description === "" ||
          dueDate === "" ||
          // priority === ""
          // chek if validations work after this check
        ) {
          alert("Please fill in all fields.");
          alert("Please fill in all fields.");
          alert("Please fill in all fields.");
          alert("Please fill in all fields.");
          alert("Please fill in all fields.");
          return;
        }

        // Update the todo in the project
        todoToEdit.title = title;
        todoToEdit.description = description;
        todoToEdit.dueDate = dueDate;
        todoToEdit.priority = priority;

        renderTodos(project);
        form.reset(); // Reset the form after editing
      });
    });
  });
}


// Add delete listeners
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

// Initial render
renderTodos(myProject);
