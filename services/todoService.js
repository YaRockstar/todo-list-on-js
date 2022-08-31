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
    const todo = this.todoList.find(t => t.id === id);
    todo.isCompleted = !todo.isCompleted;
    if (todo.isCompleted) {
      this.todoList = TodoService.sortByCompleted(this.todoList);
    } else {
      this.todoList = TodoService.sortById(this.todoList);
    }
  }

  clear() {
    this.todoList = [];
  }

  clearCompleted() {
    this.todoList = this.todoList.filter(t => !t.isCompleted);
  }
}
