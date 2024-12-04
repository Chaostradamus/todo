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

// Load todos from localStorage
function loadFromLocalStorage() {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    const todosArray = JSON.parse(savedTodos);
    todosArray.forEach((todoData) => {
      const todo = new Todo(
        todoData.title,
        todoData.description,
        todoData.dueDate,
        todoData.priority
      );
      myProject.addTodo(todo);
    });
  }
}

// Save todos to localStorage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(myProject.todos));
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();
  const dueDate = dueDateInput.value.trim();
  const priority = prioritySelect.value.trim();

  // Check if any of the fields are empty
  if (title === "" || description === "" || dueDate === "" || priority === "") {
    alert("Please fill in all fields.");
    return; // Exit the function if fields are missing
  }

  const editingIndex = form.dataset.editingIndex;

  if (editingIndex !== undefined && editingIndex !== null) {
    // Editing an existing todo
    const todoToEdit = myProject.todos[editingIndex];
    todoToEdit.title = title;
    todoToEdit.description = description;
    todoToEdit.dueDate = dueDate;
    todoToEdit.priority = priority;

    delete form.dataset.editingIndex; // Clear the editing state
  } else {
    // Adding a new todo
    const newTodo = new Todo(title, description, dueDate, priority);
    myProject.addTodo(newTodo);
  }

  renderTodos(myProject); // Re-render the todos
  saveToLocalStorage(); // Save todos to localStorage
  form.reset(); // Reset the form fields
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

// Add edit listeners
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

      // Set the editing index on the form's dataset
      form.dataset.editingIndex = index;
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
      saveToLocalStorage(); // Save the updated list to localStorage
    });
  });
}

// Initial render
loadFromLocalStorage(); // Load todos from localStorage
renderTodos(myProject);
