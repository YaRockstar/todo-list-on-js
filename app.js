import { TodoService } from './services/todoService.js';
import { HTMLService } from './services/htmlService.js';
import { LocalStorageService } from './services/localStorageService.js';
import { Todo } from './todo/todo.js';

const html = new HTMLService();
const local = new LocalStorageService();
const todoService = new TodoService(local.get());

const addBtn = document.querySelector('.main-buttons__add-btn');
const clearBtn = document.querySelector('.main-buttons__clear-btn');
const clearCompletedBtn = document.querySelector(
  '.main-buttons__clear-completed-btn'
);
const input = document.querySelector('.main-input');
const todoListContainer = document.querySelector('.todo-list');

addBtn.addEventListener('click', () => {
  const title = input.value;
  if (title) {
    const id = Date.now();
    const todo = new Todo(id, title);

    todoService.add(todo);
    local.set(todoService.todoList);

    input.value = '';
    renderTodoList(todoService.todoList);
  }
});

clearBtn.addEventListener('click', () => {
  todoService.clear();
  local.clear();
  renderTodoList(todoService.todoList);
});

clearCompletedBtn.addEventListener('click', () => {
  todoService.clearCompleted();
  local.set(todoService.todoList);
  renderTodoList(todoService.todoList);
});

input.addEventListener('keydown', event => {
  const title = input.value;
  if (title && event.key === 'Enter') {
    const id = Date.now();
    const todo = new Todo(id, title);

    todoService.add(todo);
    local.set(todoService.todoList);

    input.value = '';
    renderTodoList(todoService.todoList);
  }
});

todoListContainer.addEventListener('click', event => {
  const type = event.target?.dataset?.type;
  const id = +event.target?.closest('li')?.dataset?.id;

  if (type === 'checkbox') {
    todoService.complete(id);
  }

  if (type === 'remove-btn') {
    todoService.remove(id);
  }

  local.set(todoService.todoList);
  renderTodoList(todoService.todoList);
});

function renderTodoList(todoList) {
  todoListContainer.innerHTML = html.paintTodoList(todoList);
}

renderTodoList(todoService.todoList);
