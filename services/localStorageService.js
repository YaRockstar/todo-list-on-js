export class LocalStorageService {
  set(todoList) {
    const json = JSON.stringify(todoList);
    localStorage.setItem('todoList', json);
  }

  get() {
    const todoList = JSON.parse(localStorage.getItem('todoList')) ?? [];
    return todoList;
  }

  clear() {
    localStorage.removeItem('todoList');
  }
}
