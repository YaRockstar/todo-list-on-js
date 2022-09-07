export class TodoService {
  constructor(todoList) {
    this.todoList = todoList;
  }

  static sortByCompleted(todoList) {
    return todoList.sort((a, b) => +a.isCompleted - +b.isCompleted);
  }

  static sortById(todoList) {
    return todoList.sort((a, b) => b.id - a.id);
  }

  add(todo) {
    this.todoList.unshift(todo);
    this.todoList = TodoService.sortById(this.todoList);
  }

  remove(id) {
    this.todoList = this.todoList.filter(t => t.id !== id);
  }

  complete(id) {
    const todo = this.getById(id);
    todo.isCompleted = !todo.isCompleted;
    this.todoList = TodoService.sortById(this.todoList);
    this.todoList = TodoService.sortByCompleted(this.todoList);
  }

  edit(id) {
    const todo = this.getById(id);
    todo.isEdited = !todo.isEdited;
  }

  getById(id) {
    return this.todoList.find(t => t.id === id);
  }

  getSingleEdited() {
    return this.todoList.find(t => t.isEdited);
  }

  clearAll() {
    this.todoList = [];
  }

  clearCompleted() {
    this.todoList = this.todoList.filter(t => !t.isCompleted);
  }
}
