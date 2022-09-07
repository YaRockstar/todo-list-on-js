export class LocalStorageService {
  set(todoList) {
    const json = JSON.stringify(todoList);
    localStorage.setItem('todoList', json);
  }

  get() {
    return JSON.parse(localStorage.getItem('todoList')) ?? [];
  }

  clear() {
    localStorage.removeItem('todoList');
  }
}
