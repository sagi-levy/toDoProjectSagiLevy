const todoManager = new Todo();

const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-input-btn");
const todoList = document.getElementById("todo-list-ul");

renderList();
function addToDo() {
  todoManager.add(todoInput.value);
  console.log(todoManager);
  resetInput();

  renderList();
}
console.log(todoInput.value);

function renderList() {
  const todos = todoManager.getTodos(/* todoManager */);
  console.log(todos);
  let html = "";
  for (const todo of todos) {
    html += `
    <li data-todo-id="${todo.id}" class="list-group-item cursor-pointer d-flex justify-content-between">
        <i class="bi bi-trash-fill text-danger"></i>
        <span data-lined-id="${todo.id}" class="ms-5 ${todo.classList}"> ${todo.text}</span>
       <button class="btn btn-primary ms-5" id="edit-button">edit</button>
        
    </li>
  `;
  }
  todoList.innerHTML = html;
}
function resetInput() {
  todoInput.value = "";
}
todoBtn.addEventListener("click", addToDo);
todoList.addEventListener("click", function (e) {
  console.log(1);
  const todoId = Number(e.target.closest("li[data-todo-id]").dataset.todoId);
  const shouldRemove = e.target.classList.contains("bi-trash-fill");
  const editBtn = e.target.classList.contains("btn-primary");
  const todoLinedId = e.target.classList.contains("ms-5");
  if (shouldRemove) {
    console.log(todoId);
    todoManager.remove(todoId);

    console.log(todoManager);
  } else if (editBtn) {
    const editValue = prompt("enter your edit mission", "my new task");
    if (editValue != null) {
      todoManager.todos[todoId].text = editValue;
    }
  } else if (todoLinedId) {
    console.log(todoId);
    console.log(todoLinedId);

    //todoLinedId.className;
    todoManager.todos[todoId].classList += " text-decoration-line-through";
    console.log(todoManager.todos[todoId].classList);
    todoManager.ChangeDone(todoId);
  }
  renderList();
  return;
});

/* todoList.addEventListener("click", function (e) {
  console.log(2);
  console.log(e.target);
  const todoLinedId = e.target.classList.contains("ms-5");
  console.log(todoLinedId);
  todoLinedId.classList.add("text-decoration-line-through");
  console.log(todoLinedId);
  renderList();
}); */

/* todoList.addEventListener("click", function (e) {
  console.log(3);
  const todoId = Number(e.target.closest(`"li[data-todo-id]"`).dataset.todoId);
  const shouldEdit = e.target.closest(`button`);
  shouldEdit.innerHTML = ` <div><input type="text"><button id="edit!">edit!</button></div>`;

  edit(e.target.closest("input").value, todoId);
  renderList();
}); */
