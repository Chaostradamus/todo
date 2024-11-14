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

myProject.addTodo(myTodo);
console.log(myProject);
