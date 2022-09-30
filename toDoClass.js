class Todo {
  // PROPERTIES (this.*)
  currentId = 0;

  todos = [
    // {
    //   id: 1,
    //   text: "buy milk",
    //   isDone: false,
    //   createdAt: new Date(),
    // },
  ];
  constructor() {
    this.load();
  }

  save() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
    localStorage.setItem("currentId", this.currentId);
  }

  load() {
    if (localStorage.getItem(`todos`)) {
      this.todos = JSON.parse(localStorage.getItem("todos"));
      this.currentId = Number(localStorage.getItem(`currentId`));
    }
  }

  //METHODS (Todo.prototype.*)

  add(text) {
    if (typeof text !== "string" || text.length < 2) {
      throw new Error(
        "task needs to be at least 2 characters and typeof string"
      );
    }
    const todo = {
      id: this.currentId++,
      text,
      isDone: false,
      createdAt: new Date(),
    };
    this.todos.push(todo);
    this.save();
    return todo;
  }
  getTodos(/* this */) {
    this.save();
    return this.todos;
  }
  getTodo(/*this*/ id) {
    for (const todo of this.todos) {
      if (todo.id === id) {
        return todo;
      }
    }

    throw new Error("id was not found");
  }

  remove(id) {
    const todo = this.getTodo(id);
    //remove from array
    const indexToRemove = this.todos.indexOf(todo);
    const removeElement = this.todos.splice(indexToRemove, 1);
    //return the removed item
    this.save();
    return removeElement[0]; // take the first one because with remove i am sure i am removing one item
  }

  ChangeDone(/*this */ id, isDone = null) {
    //find the todo using getTodo
    const todo = this.getTodo(id);

    //id isDone is set the item's isDone to what given
    //else change to the opposite of what it is
    todo.isDone = typeof isDone === "boolean" ? isDone : !todo.isDone;
    this.save();

    return todo;
  }
  edit(text, id) {
    const toDoEdit = this.getTodo(id);
    toDoEdit.text = text;
    this.save();

    return todo;
  }
}
