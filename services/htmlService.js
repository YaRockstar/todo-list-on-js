export class HTMLService {
  paintEditedTodo(todo) {
    if (todo.isEdited) {
      return `
      <li class="todo-list__todo edited-text" data-id="${todo.id}">
        <div class="todo__input-wrap">        
          <label class="todo__text">
            ${todo.text}
          </label>
        </div>
        <div class="todo__buttons">
          <button class="todo__buttons__edit-btn" data-type="edit-btn">
            Изменить
          </button>
        </div>
      </li>
    `;
    }
  }

  paintTodo(todo) {
    let className = '';
    let checked = '';
    if (todo.isCompleted) {
      className = 'completed';
      checked = 'checked';
    }
    return `
      <li class="todo-list__todo ${className}" data-id="${todo.id}">
        <div class="todo__input-wrap">        
          <input class="todo__checkbox" 
            type="checkbox" 
            data-type="checkbox" 
            ${checked} />
          <label class="todo__text">
            ${todo.text}
          </label>
        </div>
        <div class="todo__buttons">
          <button class="todo__buttons__remove-btn" data-type="remove-btn">
            Удалить
          </button>
          <button class="todo__buttons__edit-btn" data-type="edit-btn">
            Изменить
          </button>
        </div>
      </li>
    `;
  }

  paintTodoList(todoList = []) {
    if (todoList.length === 0) {
      return `
        <p class="todo-list__empty">
          Здесь будут ваши задачи
        </p>
      `;
    }
    return todoList.map(this.paintTodo).join('');
  }
}
