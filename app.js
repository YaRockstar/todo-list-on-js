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

const mainInput = document.querySelector('.main-input');
const todoListContainer = document.querySelector('.todo-list');

addBtn.addEventListener('click', () => {
  const text = mainInput.value;

  if (text) {
    const id = Date.now();
    const todo = new Todo(id, text);

    todoService.add(todo);
    local.set(todoService.todoList);

    mainInput.value = '';
    renderTodoList(todoService.todoList);
  }
});

clearBtn.addEventListener('click', () => {
  todoService.clearAll();
  local.clear();
  mainInput.value = '';
  renderTodoList(todoService.todoList);
});

clearCompletedBtn.addEventListener('click', () => {
  todoService.clearCompleted();
  local.set(todoService.todoList);
  renderTodoList(todoService.todoList);
});

mainInput.addEventListener('keydown', event => {
  const text = mainInput.value;
  const todo = todoService.getSingleEdited();

  if (todo && event.key === 'Enter') {
    todo.text = text || todo.text;
    todoService.edit(todo.id);
    local.set(todoService.todoList);

    document.querySelector('.main-buttons').style.display = 'flex';
    mainInput.value = '';
    renderTodoList(todoService.todoList);
    return;
  }

  if (text && event.key === 'Enter') {
    const id = Date.now();
    const todo = new Todo(id, text);

    todoService.add(todo);
    local.set(todoService.todoList);

    mainInput.value = '';
    renderTodoList(todoService.todoList);
  }
});

todoListContainer.addEventListener('click', event => {
  const type = event.target?.dataset?.type;
  const id = +event.target?.closest('li')?.dataset?.id;

  if (type === 'edit-btn') {
    todoService.edit(id);
    const todo = todoService.getById(id);
    const mainButtons = document.querySelector('.main-buttons');

    if (todo.isEdited) {
      mainButtons.style.display = 'none';
      mainInput.value = todo.text;
      mainInput.focus();
      renderEditedTodo(todo);
      return;
    }

    if (!todo.isEdited) {
      mainButtons.style.display = 'flex';
      todo.text = mainInput.value || todo.text;
      mainInput.value = '';
    }
  }

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

function renderEditedTodo(todo) {
  todoListContainer.innerHTML = html.paintEditedTodo(todo);
}

renderTodoList(todoService.todoList);
